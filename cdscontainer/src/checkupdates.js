async function getChecksum(apiEndpoint) {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      throw new Error(`Error fetching checksum: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data); 
    return data.checksum;
  }
  
  // Function to periodically check for updates
  function startPollingForUpdates(apiEndpoint, interval = 30000) { // 30-second interval
    let lastChecksum = null;
  
    // Immediately invoke the function and then set up the interval
    (async function poll() {
      try {
        const currentChecksum = await getChecksum(apiEndpoint);
        console.log(`Current Checksum: ${currentChecksum}`);
        if (lastChecksum !== null && currentChecksum !== lastChecksum) {
          console.log('Update detected in remote app.');
          alert("Updated"); 
          // Perform additional actions here, such as reloading the remote app component
        }else {
            console.log('No update detected.'); // Log if no update is detected
          }
  
        // Update lastChecksum for the next poll iteration
        lastChecksum = currentChecksum;
      } catch (error) {
        console.error(error);
      }
  
      // Set up the next poll iteration
      setTimeout(poll, interval);
    })();
  }
export default startPollingForUpdates;