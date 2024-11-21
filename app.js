function patchRom() {
    const romFile = document.getElementById("romFile").files[0];
  
    if (!romFile) {
      alert("Please upload your ROM file.");
      return;
    }

    // Check if the patch file has been loaded via the initialize function
    if (!window.patchFile) {
      alert("Patch file not loaded!");
      return;
    }

    // Create patcher instance (if RomPatcher.js is available; needs error handling)
    const patcher = new RomPatcher();

    // Uses 'patch' function, applies patch (ofc)
    patcher.patch(romFile)
        .then((patchedRom) => {
            document.getElementById("output").innerText = "Patch applied successfully!";
        })
        .catch((error) => {
            document.getElementById("output").innerText = "Error: " + error.message;
        });
}

window.addEventListener('load', function() {
    const myPatcherSettings={
        language: 'en',
        requireValidation: false, /* w true, user won't be able to patch if their rom is not valid*/
        allowDropFiles: false /* w true, it adds basic drag and drop UX */
    };

    // Initialize patcher, load IPS file
    RomPatcherWeb.initialize(myPatcherSettings, 'Clean Font, FF4Ultima v2024 Plus, by xJ4cks.ips')
        .then((patchFile) => {
            this.window.patchFile = patchFile; // stores to browser global var
        })
        .catch((error) => {
            console.error('Patch file load failed.', error);
        });
});

  