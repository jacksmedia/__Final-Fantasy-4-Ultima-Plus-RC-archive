// Event listener to run when the page loads
window.addEventListener('load', () => {
    // Set up patcher settings
    const myPatcherSettings = {
        language: 'en',
        requireValidation: false, // Disable validation
        allowDropFiles: false  // Disable drag-and-drop UX
    };

    // Initialize the patcher with the settings and the patch file
    RomPatcherWeb.initialize(myPatcherSettings, {
        file: 'Clean Font, FF4Ultima v2024 Plus, by xJ4cks.ips',
        name: 'Clean Font for FF4Ultima', //patch name that will appear in the dropdown button
        inputCrc32: 0xDEB0A135, //add CRC32 checksum validation to patch
        description: 'This patch adds Clean Font to FF4UP', //short description that will appear when user picks this patch
        outputName: 'FF4UP Clean.sfc' //patched ROM name
        });
});

// Function to patch the ROM and trigger the download
const patchRom = () => {
    // Get the selected ROM file from the input
    const romFile = document.getElementById("romFile").files[0];

    // Check if a ROM file is selected
    if (!romFile) {
        alert("Please upload your ROM file.");
        return;
    }

    // Ensure the patch file is loaded before proceeding
    if (!window.patchFile) {
        alert("Patch file not loaded!");
        return;
    }

    // Apply the patch using RomPatcherWeb.js
    RomPatcherWeb.patch(romFile, window.patchFile)
        .then((patchedRom) => {
            // Display success message
            document.getElementById("output").innerText = "Patch applied successfully!";

            // Create a Blob from the patched ROM data (assuming it's a binary buffer or Uint8Array)
            const blob = new Blob([patchedRom], { type: 'application/octet-stream' });

            // Create a temporary download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob); // Create URL for the Blob
            link.download = 'patchedROM.sfc'; // Set the filename for the download

            // Append the link to the body
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Clean up by removing the temporary link
            document.body.removeChild(link);
        })
        .catch((error) => {
            // Handle errors during patching
            document.getElementById("output").innerText = "Error: " + error.message;
        });
};
