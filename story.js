
const baseImgPath = '/assets/images/';
const baseSvgPath = '/assets/svg/';
const baseJsonPath = '/assets/json/';
const storyFrame = document.getElementById('storyFrame');
let currentIndex = 0;
let storyData = {};

async function loadJSON(filename) {
    const response = await fetch(`${baseJsonPath}${filename}`);
    const data = await response.json();
    storyData = data;
    renderStory();
}

function renderStory() {
    let html = '';
    for (let i = 0; i <= currentIndex && i < storyData.story.length; i++) {
        const component = storyData.story[i];
        switch (component.type) {
            case 'Title':
                html += getTitleComponentHTML(component);
                break;
            case 'narrative':
                html += getNarrativeComponentHTML(component);
                break;
            case 'dialogue':
                html += getDialogueComponentHTML(component);
                break;
            case 'image':
                html += getImageComponentHTML(component);
                break;
            case 'choice':
                html += getChoiceComponentHTML(component);
                break;
            default:
                console.warn('Unknown component type:', component.type);
        }
    }
    storyFrame.innerHTML = html;
    scrollToBottomSmoothly();
}

function scrollToBottomSmoothly() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

function getTitleComponentHTML(component) {
    return `
        <div class="storyTitle">
            <div class="Square"><img src="${baseSvgPath}Polygon.svg" alt=""></div>
            <h1 class="Title">${component.title}</h1>
            <div class="Square"><img src="${baseSvgPath}Polygon.svg" alt=""></div>
        </div>
        <div class="spacingBlock"></div>`;
}

function getNarrativeComponentHTML(component) {
    return `
        <div class="storyNarrative">
            <div class="Square"><img src="${baseSvgPath}Rectangle.svg" alt=""></div>
            <p class="Text">${component.text}</p>
        </div>
        <div class="spacingBlock"></div>`;
}

function getDialogueComponentHTML(component) {
    const side = component.align === 'left' ? 'left' : 'right';
    return `
        <div class="storyDialogue-${side}">
            ${side === 'left' ? `<img src="${baseImgPath}${component.image}" alt="">` : ''}
            <p>
                <span class="Name">${component.name}</span><br>
                <span class="Text">${component.text}</span>  
            </p>
            ${side === 'right' ? `<img src="${baseImgPath}${component.image}" alt="">` : ''}
        </div>
        <div class="spacingBlock"></div>`;
}

function getImageComponentHTML(component) {
    return `<img class="storyImage" src="${baseImgPath}${component.src}" alt="${component.alt}">
        <div class="spacingBlock"></div>`;
}

function getChoiceComponentHTML(component) {
  let html = `
      <div class="storyChoice">
          <div class="Square"><img src="${baseSvgPath}Star.svg" alt=""></div>`;

  if (Array.isArray(component.choices)) {
      component.choices.forEach(choice => {
          html += `<button onclick="handleChoiceSelected('${choice.next}')">${choice.text}</button>`;
      });
  } else {
      console.error('Choices property is missing or not an array:', component);
  }

  html += `</div><div class="spacingBlock"></div>`;
  return html;
}


async function handleChoiceSelected(nextFilename) {
    currentIndex = 0; // Reset index or set to the appropriate index for the new story
    await loadJSON(nextFilename);
    renderStory();
}

document.addEventListener('keydown', (event) => {
  switch (event.code) {
      case 'Space': // Continue using space as before
      case 'ArrowRight': // Add right arrow for moving forward
          if (currentIndex < storyData.story.length - 1) {
              event.preventDefault();
              currentIndex++;
              renderStory();
          }
          break;
      case 'ArrowLeft': // Add left arrow for moving backward
          if (currentIndex > 0) {
              event.preventDefault();
              currentIndex--;
              renderStory();
          }
          break;
  }
});

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
    touchEndY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // Consider a swipe only if it's predominantly horizontal and passes a certain threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentIndex > 0) {
            currentIndex--;
        } else if (deltaX < 0 && currentIndex < storyData.story.length - 1) {
            currentIndex++;
        }
        renderStory();
    }
}

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
document.addEventListener('touchend', handleTouchEnd, false);



// Initial call to load and render the first story
loadJSON('start.json');