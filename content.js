function fixChannelLinks() {
  const channelNames = document.querySelectorAll('ytd-channel-name');
  
  channelNames.forEach(channelName => {
    const linkElement = channelName.querySelector('#text');
    if (linkElement && linkElement.textContent) {
      const channelHandle = linkElement.textContent.trim().replace(/\s+/g, '');
      const channelUrl = `https://www.youtube.com/@${channelHandle}`;
      
      // Create a wrapper element
      const wrapper = document.createElement('a');
      wrapper.href = channelUrl;
      wrapper.style.textDecoration = 'none';
      wrapper.style.color = 'inherit';
      wrapper.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      // Check if the linkElement is already wrapped
      if (linkElement.parentNode.tagName !== 'A') {
        // Wrap the existing element
        linkElement.parentNode.insertBefore(wrapper, linkElement);
        wrapper.appendChild(linkElement);
      }

      // Update styling to indicate it's clickable
      linkElement.style.cursor = 'pointer';
      linkElement.style.color = '#3ea6ff';

      // Add hover effect
      linkElement.addEventListener('mouseover', () => {
        linkElement.style.textDecoration = 'underline';
      });
      linkElement.addEventListener('mouseout', () => {
        linkElement.style.textDecoration = 'none';
      });
    }
  });
}

// Run the function initially
fixChannelLinks();

// Use a MutationObserver to handle dynamically loaded content
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      fixChannelLinks();
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });