const fs = require('fs');
const path = require('path');
require('dotenv').config();

const ASSETS_DIR = path.join(__dirname, 'public', 'assets');
const STYLE_PREFIX = "Comic line-art, 2px thick black outline (#222222), hard non-blurred shadows (4px offset, #222222), flat cell-shaded colors, Italian Green (#008C45), Off White (#F4F5F0), Italian Red (#CD212A), Pasta Gold (#FFD700). ";

const assets = [
  { name: 'title_logo.png', prompt: 'Title logo "Escape from Opa\'s Italian", Italian flag colors', width: 900, height: 450 },
  { name: 'main_visual.png', prompt: 'Protagonist "Opa" and Italian street background', width: 1125, height: 1500 },
  { name: 'start_button.png', prompt: 'Large button with text "START", Italian colors', width: 600, height: 150 },
  { name: 'stage_select_button.png', prompt: 'Square button icon with gear and map symbols', width: 150, height: 150 },
  { name: 'bg_title.png', prompt: 'Simple Italian street background at afternoon', width: 1125, height: 2436 },
  { name: 'bg_cafe.png', prompt: 'Italian cafe bar interior, espresso machine, counter, window light', width: 1125, height: 2436 },
  { name: 'clock_1400.png', prompt: 'Wall clock pointing at 2:00 PM (14:00)', width: 300, height: 300 },
  { name: 'menu_card.png', prompt: 'Menu card with cappuccino and espresso illustrations', width: 400, height: 600 },
  { name: 'espresso_cup.png', prompt: 'Small cute espresso cup', width: 200, height: 200 },
  { name: 'opa_normal.png', prompt: 'Protagonist Opa standing blankly, simple character design', width: 1024, height: 1024 },
  { name: 'opa_ordering.png', prompt: 'Opa pointing at menu, saying "Cappuccino!"', width: 1024, height: 1024 },
  { name: 'opa_success.png', prompt: 'Opa happily drinking espresso', width: 1024, height: 1024 },
  { name: 'opa_failure.png', prompt: 'Opa shocked and sad', width: 1024, height: 1024 },
  { name: 'dade_idle.png', prompt: 'Shop owner Dade crossing arms, strict face', width: 1024, height: 1024 },
  { name: 'dade_angry.png', prompt: 'Dade furious, shouting with operatic gesture', width: 1024, height: 1024 },
  { name: 'dade_satisfied.png', prompt: 'Dade nodding with a satisfied smile', width: 1024, height: 1024 },
  { name: 'tsun_appear.png', prompt: 'Ally Tsun appearing with a wink', width: 1024, height: 1024 },
  { name: 'icon_hint.png', prompt: 'Lightbulb icon for hint', width: 132, height: 132 },
  { name: 'icon_menu.png', prompt: 'Three-line hamburger menu icon', width: 132, height: 132 },
  { name: 'item_slot.png', prompt: 'Square frame with Pasta Gold border', width: 180, height: 180 },
  { name: 'overlay_clear.png', prompt: 'Success screen overlay with text "CLEAR!"', width: 1125, height: 2436 },
  { name: 'overlay_gameover.png', prompt: 'Failure screen overlay with text "GAME OVER"', width: 1125, height: 2436 },
  { name: 'btn_retry.png', prompt: 'Button with text "RETRY"', width: 450, height: 120 },
  { name: 'btn_next.png', prompt: 'Button with text "NEXT"', width: 450, height: 120 },
  { name: 'btn_title.png', prompt: 'Button with text "BACK TO TITLE"', width: 450, height: 120 }
];

async function generateAsset(asset) {
  const apiKey = process.env.BANANA_API_KEY;
  const modelKey = process.env.BANANA_MODEL_KEY || 'nano-banana-pro';

  if (!apiKey) {
    console.error('Error: BANANA_API_KEY environment variable is not set.');
    return;
  }

  console.log(`Generating ${asset.name}...`);

  const fullPrompt = STYLE_PREFIX + asset.prompt;

  try {
    // Note: This is a generic implementation for the nano-banana-pro model on Banana.dev
    const response = await fetch('https://api.banana.run/v1/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apiKey: apiKey,
        modelKey: modelKey,
        modelInputs: {
          prompt: fullPrompt,
          width: asset.width,
          height: asset.height
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    if (!data.modelOutputs || data.modelOutputs.length === 0) {
      throw new Error('No model outputs received from API');
    }

    // Assuming the API returns a direct URL or base64 in data.modelOutputs[0]
    const imageUrl = data.modelOutputs[0].url;

    if (!imageUrl) {
      throw new Error('No image URL returned from API');
    }

    const imageResponse = await fetch(imageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filePath = path.join(ASSETS_DIR, asset.name);
    fs.writeFileSync(filePath, buffer);
    console.log(`Successfully saved ${asset.name}`);
  } catch (error) {
    console.error(`Failed to generate ${asset.name}:`, error.message);
  }
}

async function main() {
  if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
  }

  for (const asset of assets) {
    await generateAsset(asset);
  }

  console.log('All asset generation requests completed.');
}

main();
