// Demo 观众头像程序生成器：确定性伪随机组合（mulberry32），120 个昵称 + 参数化头像，
// 保证 100+ 不重样（组合 key 去重，撞型自动顺延 seed）。
// 用法：import {DEMO_NAMES, makeTestAvatar} from './demo-avatars.mjs?v=1';

export const DEMO_NAMES = [
	// —— 原 24 个（保持不变）——
	'橘子汽水','星星同学','奶油小熊','薄荷拿铁','蓝莓布丁','桃桃乌龙','快乐阿柴','月亮晚安',
	'杨梅吐气','椰奶泡泡','芝士芋泥','焦糖玛奇朵','苏打绿豆','元气布丁','西瓜甜不甜','奶盖十三',
	'柚子茶茶','豆乳盒子','麻薯团子','蛋挞小伙','软糖阿姨','气泡水呀','栗子同学','糯米滋滋',
	// —— 饮品甜品系 ——
	'生椰拿铁','多肉葡萄','杨枝甘露','黑糖波波','抹茶星冰乐','海盐芝士','烤奶加布丁','柠檬气泡水',
	'蜜桃养乐多','冰镇酸梅汤','热可可棉花糖','抹茶大福','芋泥啵啵','椰椰冻冻','草莓大福','半糖去冰',
	'芝士葡萄冻','焦糖布丁烧','豆花甜党','桂花酒酿圆子','冰粉加山楂','酸奶拌麦片','海苔小贝','肉松饭团',
	// —— 自然天气系 ——
	'云朵软糖','晚风轻拂','雷雨预警','初雪来了','春日限定','夏夜晚风','银河修理员','日落收藏家',
	'月亮邮递员','追风筝的人','海盐星球','森林小鹿','苔藓与蜗牛','极光旅行家','打雷下雨收衣服','风吹半夏',
	'山间喷雾','屋顶看星星','雪后天晴','春笋冒尖','风里有诗','海边的白鸽','雨停了哦','彩虹糖纸',
	// —— 心情状态系 ——
	'今天不emo','精神饱满','干饭第一名','摸鱼冠军','熬夜十级学者','早八幸存者','快乐星球常驻','好运充电中',
	'元气满满鸭','佛系养生局','摆烂但不完全','一觉睡到自然醒','笑点低本人','心情晴转多云','周末狂热者','午睡外交官',
	'电量百分百','焦虑退散','开心果本果','烦恼清零机','今晚早睡（不','精神小豆','情绪稳定大师','躺平观察员',
	// —— 网感昵称系 ——
	'退堂鼓表演家','干饭不忘减肥','奶茶续命中','卡布奇诺不苦','爱吃火锅的猫','想瘦十斤','钱包空空','赛博小土豆',
	'电子榨菜','外卖红包猎人','深夜食堂常客','国家睡觉运动员','专业陪跑员','网速担当','抢红包手速王','表情包军火库',
	'互联网冲浪选手','沙发土豆学家','空调续命成功','网购后悔药','蹲一个好评','排队第一名','试吃员上岗','薅羊毛小能手',
	// —— 动物系 ——
	'橘猫警告','哈基米爱好者','熊猫饲养员','柴犬保安','水獭打工人','企鹅不方便','刺猬背包客','浣熊当家',
	'海獭捧手手','仓鼠腮帮子','狐狸不作妖','青蛙王子本子','土拨鼠尖叫','考拉抱树','鹦鹉学舌中','锦鲤本鲤',
	// —— 角色/身份系 ——
	'数学课代表','宿舍长本人','扫地机器人','值班小班长','图书馆钉子户','健身房逃兵','厨房杀手','自习室幽灵',
	'快递代收点','修电脑小哥','黑板擦管理员','课间操领队','值日生今天轮我','眼保健操监督员','粉笔头狙击手','广播站播音员',
];

// English nicknames for index-en.html (TikTok edition), same order/count as DEMO_NAMES.
export const DEMO_NAMES_EN = [
	'Orange Soda','Star Student','Cream Bear','Mint Latte','Blueberry Pudding','Peach Oolong','Happy Corgi','Moon Night',
	'Bayberry','Coconut Bubble','Cheese Taro','Caramel Macchiato','Soda Bean','Energy Pudding','Watermelon','Milk Cap 13',
	'Yuzu Tea','Tofu Box','Mochi','Egg Tart Guy','Gummy Aunt','Sparkling Water','Chestnut','Sticky Rice',
	'Coconut Latte','Grape Bloom','Mango Pomelo','Brown Sugar Boba','Matcha Frappe','Sea Salt Cheese','Roasted Milk Tea','Lemon Fizz',
	'Peach Yakult','Iced Plum Soda','Hot Cocoa Marshmallow','Matcha Daifuku','Taro Boba','Coco Jelly','Strawberry Daifuku','Half Sugar No Ice',
	'Cheese Grape Jelly','Creme Brulee','Sweet Tofu Pudding','Osmanthus Rice Ball','Iced Jelly Hawthorn','Yogurt Granola','Seaweed Bun','Pork Floss Rice',
	'Cloud Candy','Gentle Breeze','Thunder Alert','First Snow','Spring Edition','Summer Night Wind','Galaxy Fixer','Sunset Collector',
	'Moon Postman','Kite Chaser','Salt Star','Forest Fawn','Moss and Snail','Aurora Traveler','Rain Check','Wind and Summer',
	'Mountain Mist','Rooftop Stargazer','After Snow Sun','Bamboo Shoot','Poem in Wind','Seaside Dove','Rain Stopped','Rainbow Wrapper',
	'No Emo Today','Full Energy','Top Eater','Break Champ','Night Owl Lv10','8AM Survivor','Happy Planet','Luck Charging',
	'Full Power Duck','Zen Mode','Chill But Not','Sleep In','Easy Laughter','Partly Sunny','Weekend Fever','Nap Diplomat',
	'Battery Full','Bye Anxiety','Joy Bean','Zero Worries','Early Bird Not','Pea Spirit','Stable Mood','Lie Flat Observer',
	'Drum Quitter','Diet Tomorrow','Bubble Tea Refill','Not Bitter Cappuccino','Hotpot Cat','Lose 10 Pounds','Empty Wallet','Cyber Potato',
	'Digital Pickle','Coupon Hunter','Midnight Diner','Pro Sleeper','Pace Walker','Net Speed King','Red Packet Sniper','Meme Arsenal',
	'Surf Rider','Couch Potato','AC Life Saver','Regret Cart','Review Waiting','First in Line','Taste Tester','Wool Gatherer',
	'Orange Cat Alert','Hachiko Fan','Panda Keeper','Shiba Guard','Otter Worker','Penguin Awkward','Hedgehog Backpacker','Raccoon Boss',
	'Sea Otter Hands','Hamster Cheeks','Fox Fine','Frog Prince','Marmot Scream','Koala Hug','Parrot Echo','Koi Itself',
	'Math Rep','Dorm Leader','Roomba','Duty Monitor','Library Resident','Gym Skipper','Kitchen Disaster','Study Room Ghost',
	'Parcel Point','PC Repair Guy','Chalk Keeper','Exercise Leader','Sweeper Today','Eye Drill Watcher','Chalk Sniper','Radio Anchor',
];

const BG_COLORS = [
	'#ffb284','#a9b8f4','#d8b992','#91cbb1','#ba9ee0','#efa8b9','#e6bc6a','#89b9cd',
	'#f4a4a4','#9fd6a8','#d9c2f0','#f0d9a8','#a8d9d4','#f4b8d8','#c4d98a','#e0a8c4',
	'#8fbcd4','#e8a17e','#b5c98f','#c99fb8','#7fb8a8','#e0b07f','#a493ce','#d4a0b8',
];
const FUR_COLORS = ['#fff1da','#f8d8a8','#eecfa8','#e8b98f','#d8c8b8','#f2e0c8','#e0cfa0','#f5dcc0'];
const SKIN_COLORS = ['#ffd9b8','#f6c6a8','#eab68f','#d9a577','#c58f60'];
const HAIR_COLORS = ['#3b3340','#5d4633','#8a5a3b','#b5764a','#6b4f8a','#3e5e7e','#9e3d4f','#2f3a4a'];
const TYPES = ['cat','bear','rabbit','fox','panda','frog','human'];
const ACCESSORIES = ['none','glasses','headband','headphones','cap','round-glasses'];
const MOUTHS = ['smile','open','cat','grin'];
const PATTERNS = ['none','dots','stars','stripes'];

function mulberry32(seed) {
	let t = seed >>> 0;
	return function () {
		t += 0x6D2B79F5;
		let r = Math.imul(t ^ (t >>> 15), 1 | t);
		r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
		return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
	};
}

const GREEN_FURS = ['#9fd6a8', '#91cbb1', '#a8d9d4', '#7fb8a8', '#c4d98a']; // 青蛙限定绿色系
const usedKeys = new Set();

function pick(r, arr) { return arr[Math.floor(r() * arr.length)] }

export function makeTestAvatar(seed) {
	let i = seed >>> 0, params;
	// 确定性分配：从 seed 起，参数组合撞型则顺延（模块级去重，保证 100+ 视觉不重样）。
	for (; ; i++) {
		const r = mulberry32(i * 7919 + 13);
		params = {
			bg: pick(r, BG_COLORS),
			type: pick(r, TYPES),
			fur: null, // 先占位，type 确定后再选（青蛙限定绿色系）
			skin: pick(r, SKIN_COLORS),
			hair: pick(r, HAIR_COLORS),
			acc: pick(r, ACCESSORIES),
			mouth: pick(r, MOUTHS),
			pattern: pick(r, PATTERNS),
			blush: r() < .6,
			squint: r() < .25,
			freckles: r() < .3,
			hairStyle: Math.floor(r() * 3),
		};
		params.fur = params.type === 'frog' ? pick(r, GREEN_FURS) : pick(r, FUR_COLORS);
		const key = [params.type, params.bg, params.fur, params.hair, params.acc, params.mouth, params.pattern, params.blush, params.squint, params.freckles, params.hairStyle].join('|');
		if (!usedKeys.has(key)) { usedKeys.add(key); break }
	}
	return drawAvatar(params);
}

function drawAvatar(p) {
	const c = document.createElement('canvas');
	c.width = c.height = 256;
	const x = c.getContext('2d');
	// 背景 + 花纹
	x.fillStyle = p.bg;
	x.fillRect(0, 0, 256, 256);
	if (p.pattern === 'dots') {
		x.fillStyle = '#ffffff2e';
		for (let row = 0; row < 5; row++) for (let col = 0; col < 5; col++) {
			x.beginPath(); x.arc(28 + col * 50 + (row % 2) * 25, 28 + row * 50, 9, 0, Math.PI * 2); x.fill();
		}
	} else if (p.pattern === 'stars') {
		x.fillStyle = '#ffffff38';
		for (let k = 0; k < 9; k++) {
			const sx = 25 + (k * 67) % 206, sy = 25 + (k * 89) % 206, s = 7 + k % 3 * 3;
			x.beginPath();
			for (let j = 0; j < 10; j++) {
				const ang = Math.PI / 5 * j - Math.PI / 2, rad = j % 2 ? s * .45 : s;
				x[j ? 'lineTo' : 'moveTo'](sx + Math.cos(ang) * rad, sy + Math.sin(ang) * rad);
			}
			x.closePath(); x.fill();
		}
	} else if (p.pattern === 'stripes') {
		x.fillStyle = '#ffffff22';
		for (let k = -2; k < 9; k++) {
			x.save(); x.translate(k * 40, 0); x.rotate(-.35); x.fillRect(0, -80, 14, 450); x.restore();
		}
	}
	const isHuman = p.type === 'human';
	const faceColor = isHuman ? p.skin : p.fur;
	// —— 耳朵/头发（先画，被脸压边）——
	if (p.type === 'cat') {
		x.fillStyle = faceColor;
		for (const [ex, flip] of [[62, -1], [194, 1]]) {
			x.beginPath(); x.moveTo(ex - 26, 92); x.lineTo(ex + flip * 8, 18); x.lineTo(ex + 26, 92); x.closePath(); x.fill();
		}
		x.fillStyle = '#f0a8a8';
		for (const ex of [66, 190]) { x.beginPath(); x.moveTo(ex - 12, 80); x.lineTo(ex, 42); x.lineTo(ex + 12, 80); x.closePath(); x.fill() }
	} else if (p.type === 'bear') {
		x.fillStyle = faceColor;
		for (const ex of [62, 194]) { x.beginPath(); x.arc(ex, 62, 32, 0, Math.PI * 2); x.fill() }
		x.fillStyle = '#d8a890';
		for (const ex of [62, 194]) { x.beginPath(); x.arc(ex, 62, 15, 0, Math.PI * 2); x.fill() }
	} else if (p.type === 'rabbit') {
		x.fillStyle = faceColor;
		for (const [ex, tilt] of [[88, -.12], [168, .12]]) {
			x.save(); x.translate(ex, 60); x.rotate(tilt);
			x.beginPath(); x.ellipse(0, -34, 22, 62, 0, 0, Math.PI * 2); x.fill();
			x.fillStyle = '#f4b8c0'; x.beginPath(); x.ellipse(0, -30, 10, 42, 0, 0, Math.PI * 2); x.fill();
			x.fillStyle = faceColor; x.restore();
		}
	} else if (p.type === 'fox') {
		x.fillStyle = faceColor;
		for (const [ex, flip] of [[58, -1], [198, 1]]) {
			x.beginPath(); x.moveTo(ex - 28, 96); x.lineTo(ex + flip * 12, 14); x.lineTo(ex + 28, 96); x.closePath(); x.fill();
		}
		x.fillStyle = '#3b3340';
		for (const [ex, flip] of [[58, -1], [198, 1]]) {
			x.beginPath(); x.moveTo(ex + flip * 4, 40); x.lineTo(ex + flip * 12, 14); x.lineTo(ex + flip * 20, 44); x.closePath(); x.fill();
		}
	} else if (p.type === 'panda') {
		x.fillStyle = '#f2f0ea';
		for (const ex of [62, 194]) { x.beginPath(); x.arc(ex, 58, 30, 0, Math.PI * 2); x.fill() }
		x.fillStyle = '#35333c';
		for (const ex of [62, 194]) { x.beginPath(); x.arc(ex, 58, 30, Math.PI * .85, Math.PI * 2.15); x.arc(ex, 58, 16, Math.PI * 2.15, Math.PI * .85, true); x.fill() }
	} else if (p.type === 'frog') {
		// 青蛙：头顶两只凸眼（画在脸之上层，见后），这里先铺底色
	}
	// —— 脸主体 ——
	x.fillStyle = faceColor;
	x.beginPath(); x.ellipse(128, 140, 82, 86, 0, 0, Math.PI * 2); x.fill();
	if (p.type === 'fox') { // 狐狸白脸颊
		x.fillStyle = '#fdf6ea';
		x.beginPath(); x.ellipse(128, 158, 60, 56, 0, 0, Math.PI * 2); x.fill();
	}
	if (p.type === 'human') { // 发型（3 变体）
		x.fillStyle = p.hair;
		if (p.hairStyle === 0) { // 齐刘海
			x.beginPath(); x.ellipse(128, 92, 84, 52, 0, Math.PI, Math.PI * 2); x.fill();
			x.beginPath(); x.ellipse(128, 84, 84, 40, 0, 0, Math.PI); x.fill();
		} else if (p.hairStyle === 1) { // 中分
			x.beginPath(); x.ellipse(128, 90, 84, 54, 0, Math.PI, Math.PI * 2); x.fill();
			x.beginPath(); x.moveTo(128, 52); x.quadraticCurveTo(60, 70, 66, 118); x.quadraticCurveTo(96, 78, 128, 74); x.quadraticCurveTo(160, 78, 190, 118); x.quadraticCurveTo(196, 70, 128, 52); x.fill();
		} else { // 蓬松爆炸
			for (const [ex, ey, er] of [[58, 96, 34], [92, 62, 38], [128, 50, 40], [164, 62, 38], [198, 96, 34]]) {
				x.beginPath(); x.arc(ex, ey, er, 0, Math.PI * 2); x.fill();
			}
		}
	}
	if (p.type === 'frog') { // 凸眼
		for (const ex of [80, 176]) {
			x.fillStyle = faceColor; x.beginPath(); x.arc(ex, 62, 34, 0, Math.PI * 2); x.fill();
			x.fillStyle = '#ffffff'; x.beginPath(); x.arc(ex, 58, 22, 0, Math.PI * 2); x.fill();
			x.fillStyle = '#353342';
			if (p.squint) { x.strokeStyle = '#353342'; x.lineWidth = 5; x.beginPath(); x.arc(ex, 58, 12, Math.PI + .4, Math.PI * 2 - .4); x.stroke(); }
			else { x.beginPath(); x.arc(ex + (ex < 128 ? 3 : -3), 58, 9, 0, Math.PI * 2); x.fill() }
		}
	}
	// —— 眼睛（青蛙已画）——
	if (p.type !== 'frog') {
		x.fillStyle = '#353342';
		if (p.squint) {
			x.strokeStyle = '#353342'; x.lineWidth = 6; x.lineCap = 'round';
			for (const ex of [98, 158]) { x.beginPath(); x.arc(ex, 126, 13, Math.PI + .5, Math.PI * 2 - .5); x.stroke() }
		} else {
			for (const ex of [99, 157]) { x.beginPath(); x.ellipse(ex, 127, 7.5, 10.5, 0, 0, Math.PI * 2); x.fill() }
		}
	}
	// 鼻子（人/猫/狐/熊小点鼻）
	if (p.type === 'cat' || p.type === 'fox') {
		x.fillStyle = '#e8918f';
		x.beginPath(); x.moveTo(120, 150); x.lineTo(136, 150); x.lineTo(128, 161); x.closePath(); x.fill();
	} else if (p.type === 'panda' || p.type === 'bear') {
		x.fillStyle = '#3b3340'; x.beginPath(); x.ellipse(128, 148, 9, 7, 0, 0, Math.PI * 2); x.fill();
	} else if (p.type === 'human' && p.freckles) {
		x.fillStyle = '#c58f6088';
		for (const [fx, fy] of [[86, 150], [98, 156], [80, 160], [170, 150], [158, 156], [176, 160]]) {
			x.beginPath(); x.arc(fx, fy, 3, 0, Math.PI * 2); x.fill();
		}
	}
	// —— 嘴 ——
	x.strokeStyle = '#57424a'; x.lineWidth = 5; x.lineCap = 'round';
	if (p.mouth === 'smile') {
		x.beginPath(); x.arc(128, 150, 20, .2, Math.PI - .2); x.stroke();
	} else if (p.mouth === 'open') {
		x.fillStyle = '#8c4a4a';
		x.beginPath(); x.ellipse(128, 162, 18, 14, 0, 0, Math.PI); x.fill();
		x.fillStyle = '#f0918f'; x.beginPath(); x.ellipse(128, 172, 10, 6, 0, 0, Math.PI); x.fill();
	} else if (p.mouth === 'cat') {
		x.beginPath(); x.moveTo(112, 156); x.quadraticCurveTo(120, 164, 128, 156); x.quadraticCurveTo(136, 164, 144, 156); x.stroke();
	} else { // grin 咧嘴
		x.fillStyle = '#8c4a4a';
		x.beginPath(); x.moveTo(104, 154); x.quadraticCurveTo(128, 178, 152, 154); x.quadraticCurveTo(128, 166, 104, 154); x.fill();
	}
	// 猫/狐胡须
	if (p.type === 'cat' || p.type === 'fox') {
		x.strokeStyle = '#57424a99'; x.lineWidth = 3;
		for (const [sy, off] of [[146, 0], [156, 0]]) {
			x.beginPath(); x.moveTo(52 + off, sy); x.lineTo(84 + off, sy + (sy === 146 ? -4 : 2)); x.stroke();
			x.beginPath(); x.moveTo(204 - off, sy); x.lineTo(172 - off, sy + (sy === 146 ? -4 : 2)); x.stroke();
		}
	}
	// 腮红
	if (p.blush) {
		x.fillStyle = '#f0908f66';
		for (const ex of [78, 178]) { x.beginPath(); x.ellipse(ex, 156, 15, 9, 0, 0, Math.PI * 2); x.fill() }
	}
	// —— 配饰 ——
	if (p.acc === 'glasses') {
		x.strokeStyle = '#3b3340'; x.lineWidth = 5;
		for (const ex of [99, 157]) { x.beginPath(); x.arc(ex, 127, 17, 0, Math.PI * 2); x.stroke() }
		x.beginPath(); x.moveTo(116, 127); x.lineTo(140, 127); x.stroke();
	} else if (p.acc === 'round-glasses') {
		x.strokeStyle = '#3b3340'; x.lineWidth = 5;
		for (const ex of [99, 157]) { x.beginPath(); x.arc(ex, 127, 24, 0, Math.PI * 2); x.stroke() }
		x.beginPath(); x.moveTo(123, 127); x.lineTo(133, 127); x.stroke();
	} else if (p.acc === 'headband') {
		x.fillStyle = '#e86a6a';
		x.save(); x.translate(128, 74); x.rotate(-.1); x.fillRect(-86, -10, 172, 20); x.restore();
		x.fillStyle = '#f0a0a0';
		for (const [bx, bs] of [[196, 1], [216, .6]]) { // 右耳侧蝴蝶结
			x.beginPath(); x.ellipse(200 + bs * 12, 68 + (bs - 1) * 10, 12 * bs + 6, 8 * bs + 4, bs * .6, 0, Math.PI * 2); x.fill();
		}
	} else if (p.acc === 'headphones') {
		x.strokeStyle = '#3b3340'; x.lineWidth = 9;
		x.beginPath(); x.arc(128, 118, 96, Math.PI * 1.12, Math.PI * 1.88); x.stroke();
		x.fillStyle = '#3b3340';
		for (const ex of [34, 222]) { x.beginPath(); x.ellipse(ex, 122, 14, 20, 0, 0, Math.PI * 2); x.fill() }
		x.fillStyle = '#7fd69a';
		for (const ex of [34, 222]) { x.beginPath(); x.ellipse(ex, 122, 6, 9, 0, 0, Math.PI * 2); x.fill() }
	} else if (p.acc === 'cap') {
		x.fillStyle = '#4a7fb5';
		x.beginPath(); x.ellipse(128, 66, 78, 40, 0, Math.PI, Math.PI * 2); x.fill();
		x.fillRect(50, 62, 156, 10);
		x.fillStyle = '#3a6a9c';
		x.beginPath(); x.ellipse(128, 70, 96, 16, 0, Math.PI, Math.PI * 2); x.fill();
	}
	return c.toDataURL('image/png');
}
