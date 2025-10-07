import { BaZiPillar } from './bazi';

export interface LegionRole {
  id: string;
  name: string;
  title: string;
  description: string;
  element: string;
  personality: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface Legion {
  id: string;
  name: string;
  color: string;
  theme: string;
  description: string;
  general: LegionRole;
  strategist: LegionRole;
  deputy: LegionRole;
  soldiers: LegionRole[];
  story: string;
  advice: string;
}

// 天干角色對應 (10 Heavenly Stem Characters)
export const HEAVENLY_STEM_ROLES: Record<string, LegionRole> = {
  '甲': {
    id: 'general-jia',
    name: '蒼龍將軍',
    title: '東方青龍',
    description: '如參天大樹般挺拔，具有強烈的領導欲和開拓精神',
    element: '木',
    personality: ['剛正不阿', '積極進取', '具有領袖氣質'],
    strengths: ['天生領導力', '創新思維', '勇於開拓'],
    weaknesses: ['過於固執', '不夠靈活', '容易衝動']
  },
  '乙': {
    id: 'general-yi',
    name: '翠竹軍師',
    title: '柔韌智者',
    description: '如翠竹般彈性十足，善於適應環境變化',
    element: '木',
    personality: ['溫和親切', '靈活應變', '善解人意'],
    strengths: ['適應能力強', '善於協調', '富有創意'],
    weaknesses: ['缺乏決斷力', '容易猶豫', '過於謙讓']
  },
  '丙': {
    id: 'general-bing',
    name: '烈日統帥',
    title: '太陽戰神',
    description: '如烈日般熱情奔放，具有強大的感染力',
    element: '火',
    personality: ['熱情開朗', '樂觀積極', '富有魅力'],
    strengths: ['感染力強', '積極樂觀', '勇敢無畏'],
    weaknesses: ['缺乏耐性', '容易浮躁', '過度自信']
  },
  '丁': {
    id: 'general-ding',
    name: '明燈護衛',
    title: '溫暖之光',
    description: '如燈火般溫暖人心，善於照顧他人',
    element: '火',
    personality: ['溫暖體貼', '細膩敏感', '富有同情心'],
    strengths: ['洞察力強', '善於關懷', '富有藝術天分'],
    weaknesses: ['過於敏感', '容易受傷', '缺乏自信']
  },
  '戊': {
    id: 'general-wu',
    name: '山岳守護',
    title: '大地之盾',
    description: '如高山般穩重可靠，是天生的守護者',
    element: '土',
    personality: ['穩重可靠', '腳踏實地', '富有責任感'],
    strengths: ['執行力強', '值得信賴', '意志堅定'],
    weaknesses: ['思維保守', '變通性差', '容易固執']
  },
  '己': {
    id: 'general-ji',
    name: '沃土育者',
    title: '豐饒之母',
    description: '如肥沃土壤般包容一切，善於培育他人',
    element: '土',
    personality: ['包容寬厚', '善於培育', '富有母性'],
    strengths: ['包容力強', '善於栽培', '富有耐心'],
    weaknesses: ['缺乏主見', '容易依賴', '過於保守']
  },
  '庚': {
    id: 'general-geng',
    name: '鋼鐵戰士',
    title: '剛毅之劍',
    description: '如鋼鐵般剛毅果決，具有強烈的正義感',
    element: '金',
    personality: ['剛毅果決', '正義凜然', '意志堅強'],
    strengths: ['決斷力強', '執行力佳', '公正無私'],
    weaknesses: ['過於剛硬', '不夠圓滑', '容易得罪人']
  },
  '辛': {
    id: 'general-xin',
    name: '寶石術士',
    title: '珍貴之寶',
    description: '如珍貴寶石般細膩精緻，追求完美品質',
    element: '金',
    personality: ['精緻細膩', '追求完美', '富有品味'],
    strengths: ['品味高雅', '注重細節', '富有美感'],
    weaknesses: ['過於挑剔', '容易焦慮', '缺乏韌性']
  },
  '壬': {
    id: 'general-ren',
    name: '江河霸主',
    title: '流水之王',
    description: '如江河般氣勢磅礴，具有廣闊的視野',
    element: '水',
    personality: ['氣度恢宏', '思維敏捷', '富有智慧'],
    strengths: ['思維活躍', '適應性強', '富有智慧'],
    weaknesses: ['缺乏持久力', '容易變心', '過於理想化']
  },
  '癸': {
    id: 'general-gui',
    name: '甘露仙子',
    title: '純淨之源',
    description: '如甘露般純淨溫柔，具有強大的包容力',
    element: '水',
    personality: ['溫柔純淨', '富有想像力', '直覺敏銳'],
    strengths: ['直覺力強', '富有創意', '善於感化'],
    weaknesses: ['過於理想化', '缺乏現實感', '容易迷失']
  }
};

// 地支角色對應 (12 Earthly Branch Characters)
export const EARTHLY_BRANCH_ROLES: Record<string, LegionRole> = {
  '子': {
    id: 'strategist-zi',
    name: '智慧之鼠',
    title: '夜行軍師',
    description: '機智靈活，善於在黑暗中尋找機會',
    element: '水',
    personality: ['機智靈活', '善於謀劃', '觀察力強'],
    strengths: ['反應敏捷', '善於分析', '適應能力強'],
    weaknesses: ['過於謹慎', '缺乏魄力', '容易多疑']
  },
  '丑': {
    id: 'strategist-chou',
    name: '勤耕之牛',
    title: '穩固基石',
    description: '勤勞踏實，是團隊中最可靠的力量',
    element: '土',
    personality: ['勤勞踏實', '任勞任怨', '堅持不懈'],
    strengths: ['執行力強', '值得信賴', '有耐力'],
    weaknesses: ['思維僵化', '缺乏創新', '過於保守']
  },
  '寅': {
    id: 'strategist-yin',
    name: '威武之虎',
    title: '森林王者',
    description: '威武勇猛，具有強烈的競爭意識',
    element: '木',
    personality: ['威武勇猛', '競爭心強', '有統治欲'],
    strengths: ['勇敢無畏', '領導力強', '富有魄力'],
    weaknesses: ['過於衝動', '缺乏耐性', '容易獨斷']
  },
  '卯': {
    id: 'strategist-mao',
    name: '敏捷之兔',
    title: '月宮使者',
    description: '敏捷溫和，善於在複雜環境中生存',
    element: '木',
    personality: ['溫和敏捷', '善於交際', '富有同情心'],
    strengths: ['反應敏捷', '善於溝通', '富有直覺'],
    weaknesses: ['缺乏決斷力', '容易受影響', '過於敏感']
  },
  '辰': {
    id: 'strategist-chen',
    name: '神秘之龍',
    title: '天空霸主',
    description: '神秘強大，具有超凡的智慧和能力',
    element: '土',
    personality: ['神秘莫測', '智慧超群', '富有想像力'],
    strengths: ['洞察力強', '富有創意', '具有遠見'],
    weaknesses: ['過於理想化', '難以親近', '容易孤獨']
  },
  '巳': {
    id: 'strategist-si',
    name: '智慧之蛇',
    title: '冷靜謀士',
    description: '冷靜智慧，善於深度思考和謀劃',
    element: '火',
    personality: ['冷靜智慧', '善於思考', '具有洞察力'],
    strengths: ['思維深邃', '善於謀劃', '具有耐心'],
    weaknesses: ['過於冷靜', '缺乏熱情', '容易多疑']
  },
  '午': {
    id: 'strategist-wu',
    name: '奔騰之馬',
    title: '自由戰士',
    description: '熱情奔放，追求自由和冒險',
    element: '火',
    personality: ['熱情奔放', '追求自由', '富有冒險精神'],
    strengths: ['行動力強', '富有活力', '善於激勵'],
    weaknesses: ['缺乏耐性', '容易衝動', '難以持久']
  },
  '未': {
    id: 'strategist-wei',
    name: '溫順之羊',
    title: '和平使者',
    description: '溫和善良，善於化解衝突',
    element: '土',
    personality: ['溫和善良', '富有同情心', '善於協調'],
    strengths: ['善解人意', '富有耐心', '善於調解'],
    weaknesses: ['缺乏主見', '容易依賴', '過於被動']
  },
  '申': {
    id: 'strategist-shen',
    name: '機智之猴',
    title: '靈活戰術家',
    description: '機智靈活，善於靈活應對各種情況',
    element: '金',
    personality: ['機智靈活', '善於變通', '富有創意'],
    strengths: ['適應能力強', '思維活躍', '善於創新'],
    weaknesses: ['缺乏專注', '容易分心', '不夠穩定']
  },
  '酉': {
    id: 'strategist-you',
    name: '勤勉之雞',
    title: '時間守護者',
    description: '勤勉守時，具有強烈的責任感',
    element: '金',
    personality: ['勤勉守時', '富有責任感', '注重細節'],
    strengths: ['執行力強', '注重品質', '具有條理'],
    weaknesses: ['過於拘謹', '缺乏靈活性', '容易焦慮']
  },
  '戌': {
    id: 'strategist-xu',
    name: '忠誠之犬',
    title: '守護戰士',
    description: '忠誠可靠，是最值得信賴的夥伴',
    element: '土',
    personality: ['忠誠可靠', '富有正義感', '保護欲強'],
    strengths: ['值得信賴', '忠誠度高', '保護能力強'],
    weaknesses: ['過於固執', '缺乏變通', '容易偏見']
  },
  '亥': {
    id: 'strategist-hai',
    name: '憨厚之豬',
    title: '福德之神',
    description: '憨厚善良，具有強大的包容力和福氣',
    element: '水',
    personality: ['憨厚善良', '包容寬厚', '知足常樂'],
    strengths: ['包容力強', '善於享受', '富有福氣'],
    weaknesses: ['缺乏進取心', '容易滿足', '不夠敏銳']
  }
};

// 四大軍團主題
export const LEGION_THEMES = {
  family: {
    name: '家族兵團',
    description: '承載祖先智慧，傳承血脈力量',
    color: 'oklch(0.75 0.15 60)',
    pillar: 'year'
  },
  growth: {
    name: '成長兵團', 
    description: '代表學習發展，人生成長軌跡',
    color: 'oklch(0.85 0.20 120)',
    pillar: 'month'
  },
  self: {
    name: '本我兵團',
    description: '核心本質所在，真實自我體現',
    color: 'oklch(0.60 0.25 270)',
    pillar: 'day'
  },
  future: {
    name: '未來兵團',
    description: '指向人生目標，未來發展方向',
    color: 'oklch(0.70 0.25 20)',
    pillar: 'hour'
  }
};

export function createLegion(pillar: BaZiPillar, type: keyof typeof LEGION_THEMES): Legion {
  const theme = LEGION_THEMES[type];
  const general = HEAVENLY_STEM_ROLES[pillar.heavenlyStem];
  const strategist = EARTHLY_BRANCH_ROLES[pillar.earthlyBranch];
  
  // Create deputy and soldiers from hidden stems
  const deputy = pillar.hiddenStems.length > 0 ? 
    HEAVENLY_STEM_ROLES[pillar.hiddenStems[0]] : general;
  
  const soldiers = pillar.hiddenStems.slice(1).map(stem => 
    HEAVENLY_STEM_ROLES[stem] || general
  );

  return {
    id: type,
    name: theme.name,
    color: theme.color,
    theme: theme.description,
    description: `${theme.description}，由${general.name}率領，${strategist.name}輔佐`,
    general,
    strategist,
    deputy,
    soldiers,
    story: '', // Will be generated by AI
    advice: '' // Will be generated by AI
  };
}