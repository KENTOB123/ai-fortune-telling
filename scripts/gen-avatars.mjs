#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 占い師データ
const fortuners = [
  {
    id: 'luna',
    name: 'ルナ',
    title: '月の導き手',
    prompt: 'A beautiful Japanese fortune teller with silver hair and mystical blue eyes, wearing a flowing white robe with moon symbols, ethereal and mysterious, digital art style, 512x512'
  },
  {
    id: 'soleil',
    name: 'ソレイユ',
    title: '太陽の預言者',
    prompt: 'A radiant Japanese fortune teller with golden hair and warm amber eyes, wearing a bright yellow robe with sun symbols, optimistic and energetic, digital art style, 512x512'
  },
  {
    id: 'zephyr',
    name: 'ゼファー',
    title: '風の使者',
    prompt: 'A swift Japanese fortune teller with silver-gray hair and sharp green eyes, wearing a flowing blue robe with wind symbols, quick and decisive, digital art style, 512x512'
  },
  {
    id: 'terra',
    name: 'テラ',
    title: '大地の守護者',
    prompt: 'A grounded Japanese fortune teller with brown hair and warm earth-colored eyes, wearing a green robe with earth symbols, stable and nurturing, digital art style, 512x512'
  },
  {
    id: 'noir',
    name: 'ノワール',
    title: '闇の賢者',
    prompt: 'A mysterious Japanese fortune teller with dark hair and deep purple eyes, wearing a black robe with mystical symbols, wise and enigmatic, digital art style, 512x512'
  }
];

// 画像生成関数（モック）
async function generateAvatar(fortuner) {
  console.log(`🎨 生成中: ${fortuner.name} (${fortuner.title})`);
  console.log(`📝 プロンプト: ${fortuner.prompt}`);
  
  // 実際のAPI実装例（コメントアウト）
  /*
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.AVATAR_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: fortuner.prompt,
      n: 1,
      size: '512x512',
      response_format: 'url'
    })
  });
  
  const data = await response.json();
  return data.data[0].url;
  */
  
  // モック実装
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`✅ 生成完了: ${fortuner.name}`);
  
  return `https://example.com/avatar-${fortuner.id}.png`;
}

// 画像保存関数
async function saveAvatar(imageUrl, fortunerId) {
  const outputDir = path.join(__dirname, '../public/fortuners');
  
  // ディレクトリが存在しない場合は作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, `${fortunerId}.png`);
  
  // 実際の画像ダウンロード実装例（コメントアウト）
  /*
  const response = await fetch(imageUrl);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  */
  
  // モック実装
  console.log(`💾 保存: ${outputPath}`);
  
  // プレースホルダー画像を作成（実際の実装では削除）
  const placeholderSvg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" fill="#1a1a2e"/>
    <circle cx="256" cy="256" r="100" fill="#16213e" stroke="#0f3460" stroke-width="4"/>
    <text x="256" y="270" text-anchor="middle" fill="#e94560" font-family="Arial" font-size="48" font-weight="bold">
      ${fortunerId.charAt(0).toUpperCase()}
    </text>
    <text x="256" y="400" text-anchor="middle" fill="#e94560" font-family="Arial" font-size="16">
      ${fortunerId}
    </text>
  </svg>`;
  
  // SVGをPNGに変換する代わりに、SVGとして保存
  fs.writeFileSync(outputPath.replace('.png', '.svg'), placeholderSvg);
}

// メイン処理
async function main() {
  console.log('🔮 占い師アバター生成を開始します...\n');
  
  for (const fortuner of fortuners) {
    try {
      const imageUrl = await generateAvatar(fortuner);
      await saveAvatar(imageUrl, fortuner.id);
      console.log('');
    } catch (error) {
      console.error(`❌ エラー: ${fortuner.name} の生成に失敗しました`, error);
    }
  }
  
  console.log('🎉 すべての占い師アバターの生成が完了しました！');
  console.log('\n📁 生成されたファイル:');
  console.log('   public/fortuners/');
  fortuners.forEach(f => console.log(`   - ${f.id}.svg (プレースホルダー)`));
  
  console.log('\n💡 実際の画像を使用する場合:');
  console.log('   1. 上記のSVGファイルを削除');
  console.log('   2. 512×512pxのPNG画像を配置');
  console.log('   3. ファイル名: {占い師ID}.png');
  console.log('\n🔧 API連携する場合:');
  console.log('   1. AVATAR_API_KEY環境変数を設定');
  console.log('   2. コメントアウトされたAPI実装を有効化');
}

// スクリプト実行
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
} 