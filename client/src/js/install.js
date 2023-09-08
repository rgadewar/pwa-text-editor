const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior to suppress the browser's default installation prompt.
    event.preventDefault();
    // Store the event object for later use.
    deferredPrompt = event;
    // Show a custom installation button (e.g., 'Install App') to the user.
    butInstall.style.display = 'block';
  });
  
// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Show the browser's installation prompt.
      deferredPrompt.prompt();
      // Wait for the user's choice and capture the result.
      const choiceResult = await deferredPrompt.userChoice;
      // Reset the deferredPrompt variable.
      deferredPrompt = null;
  
      // Handle the result if needed (e.g., log or track installations).
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the installation');
      } else {
        console.log('User declined the installation');
      }
    }
  });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Perform post-installation tasks if needed.
    console.log('App installed:', event);
  });
