// Hangar.js (ESM, no web3 needed)
import React, { useState, useEffect } from "https://esm.sh/react@18";

const Metamask = () => {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!window.ethereum) return;
    const onAccountsChanged = (accs) => setAddress(accs[0] ?? null);
    window.ethereum.on?.("accountsChanged", onAccountsChanged);
    return () => window.ethereum.removeListener?.("accountsChanged", onAccountsChanged);
  }, []);

  const connect = async () => {
    setError(null);
    if (!window.ethereum) {
      setError("MetaMask not detected. Please install it.");
      return;
    }
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAddress(accounts[0] ?? null);
  };

  const signAndRegister = async () => {
    setBusy(true);
    setError(null);
    try {
      const acc = address ?? (await window.ethereum.request({ method: "eth_requestAccounts" }))[0];
      const message = "giveawaypot1";
      // personal_sign expects [message, address]
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, acc],
      });

      const resp = await fetch("https://gpt.netcoin.io/api/v1/accounts", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json", "X-Requested-With": "JSON" },
        body: JSON.stringify({ waxaccount: "giveawaypot1", signature, wallet: acc.toLowerCase() }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        const msg =
          data?.message?.details?.[0]?.message?.split(":")[1] ||
          data?.message ||
          resp.statusText;
        throw new Error(msg);
      }
      console.log("Signup response:", data);
    } catch (err) {
      setError(err?.message || String(err));
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button onClick={connect} disabled={busy}>Connect MetaMask</button>
      <button onClick={signAndRegister} disabled={busy || !address}>
        {busy ? "Signing…" : "Sign & Register"}
      </button>
      {address && <p>User Address: {address}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default Metamask;
