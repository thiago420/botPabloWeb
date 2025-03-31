window.addEventListener("load", async () => {
    const params = new URLSearchParams(window.location.search);
    url = `steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20${params.get("url")}`;
    window.open(url, '_self');
})