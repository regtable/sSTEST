import React, { useEffect } from 'https://cdn.skypack.dev/react';

const identifier = 'DeployStarshipReact';


const Waxa = ({ justid, anchor, cloud, logout, setid, isloggedin, setisloggedin, setfirstrun, setwax, settopbar, setActiveWindow, setcloud, setanchor, setislogina, setisloginc }) => {
const wax = new waxjs.WaxJS({
        rpcEndpoint: 'https://wax.api.eosnation.io',
    autologin:true
    });  

    // Auto-login Effect
    useEffect(() => {
        const autoLogin = async () => {
            try {
                const isAutoLoginAvailable = await wax.isAutoLoginAvailable();
                if (isAutoLoginAvailable) {
                    const userAccount = wax.userAccount;
                    console.log(wax.userAccount);
                    setwax(wax);
                    setid(userAccount.toString());
                    setisloggedin(true);
                    setfirstrun(true);
                    settopbar(true);
                    setActiveWindow({ type: 'loading' });
                    setcloud(true);
                }
            } catch (error) {
                console.error('Error during auto-login:', error);
            }
        };

        autoLogin();
    }, [setid, setwax, setisloggedin, setfirstrun, settopbar, setActiveWindow, setcloud]);

    // Manual Login with Cloud or Anchor
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cloud === true) {
                    setwax(wax);
                    const userAccount = await wax.login(identifier);
                    setid(userAccount.toString());
                    if (!justid) {
                        const response = await fetch("https://backend.deploystarship.com/api/v1/accounts", {
                            method: 'PUT',
                            body: JSON.stringify({ waxaccount: userAccount }),
                            headers: {
                                'Content-Type': 'text/plain',
                                'X-Requested-With': 'JSON',
                            },
                        });

                        const data = await response.json();
                        if (data.message !== "ok") {
                            throw data.message;
                        }

                        setisloggedin(true);
                        setfirstrun(true);
                        settopbar(true);
                        setActiveWindow({ type: 'loading' });
                    }

                    setcloud(true);
                } else if (anchor) {
                    const transport = new AnchorLinkBrowserTransport();
                    const link = new AnchorLink({
                        transport,
                        chains: [{
                            chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
                            nodeUrl: 'https://wax.blokcrafters.io',
                        }],
                    });
                    setwax(link);
                    try {
                        const result = await link.login(identifier);
                        const userAccount = result.session.auth.actor;
                        setid(userAccount.toString());

                        if (!justid) {
                            const response = await fetch("https://backend.deploystarship.com/api/v1/accounts", {
                                method: 'PUT',
                                body: JSON.stringify({ waxaccount: userAccount }),
                                headers: {
                                    'Content-Type': 'text/plain',
                                    'X-Requested-With': 'JSON',
                                },
                            });

                            const data = await response.json();
                            if (data.message !== "ok") {
                                throw data.message;
                            }

                            setisloggedin(true);
                            setfirstrun(true);
                            settopbar(true);
                            setActiveWindow({ type: 'loading' });
                        }

                        setanchor(true);
                    } catch (err) {
                        console.error('Error during login:', err);
                        setislogina(false);
                        setisloginc(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setislogina(false);
                setisloginc(false);
            }
        };

        fetchData();
    }, [anchor, cloud, setfirstrun, setid, setisloggedin]);

    return null;
};

export default Waxa;
