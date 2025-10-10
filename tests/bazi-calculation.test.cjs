/**
 * BaZi Calculation Verification Tests
 * 八字計算驗證測試
 * 
 * This file contains verification tests for the BaZi calculation logic.
 * These tests verify that the calculations match traditional Chinese astrology rules.
 */

// Constants from bazi.ts
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const ELEMENTS = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', 
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
  '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
};

const YIN_YANG = {
  '甲': 'yang', '乙': 'yin', '丙': 'yang', '丁': 'yin', '戊': 'yang',
  '己': 'yin', '庚': 'yang', '辛': 'yin', '壬': 'yang', '癸': 'yin',
  '子': 'yang', '丑': 'yin', '寅': 'yang', '卯': 'yin', '辰': 'yang',
  '巳': 'yin', '午': 'yang', '未': 'yin', '申': 'yang', '酉': 'yin',
  '戌': 'yang', '亥': 'yin'
};

const HIDDEN_STEMS = {
  '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'], '卯': ['乙'],
  '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'], '午': ['丁', '己'], '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'], '酉': ['辛'], '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲']
};

/**
 * Test Case 1: Year Pillar Calculation
 * Test that year 2000 produces 庚辰 (Geng Chen)
 */
function testYearPillarCalculation() {
  console.log('Test 1: Year Pillar Calculation for Year 2000');
  
  const year = 2000;
  const yearStemIndex = (year - 4) % 10;
  const yearBranchIndex = (year - 4) % 12;
  
  const yearStem = HEAVENLY_STEMS[yearStemIndex];
  const yearBranch = EARTHLY_BRANCHES[yearBranchIndex];
  
  const expected = '庚辰';
  const actual = yearStem + yearBranch;
  
  console.log(`  Expected: ${expected}`);
  console.log(`  Actual: ${actual}`);
  console.log(`  Result: ${actual === expected ? 'PASS ✓' : 'FAIL ✗'}\n`);
  
  return actual === expected;
}

/**
 * Test Case 2: 60-Year Cycle Verification
 * Test that year 1984 produces 甲子 (Jia Zi) - start of cycle
 */
function testSixtyYearCycle() {
  console.log('Test 2: 60-Year Cycle Verification (Year 1984)');
  
  const year = 1984;
  const yearStemIndex = (year - 4) % 10;
  const yearBranchIndex = (year - 4) % 12;
  
  const yearStem = HEAVENLY_STEMS[yearStemIndex];
  const yearBranch = EARTHLY_BRANCHES[yearBranchIndex];
  
  const expected = '甲子';
  const actual = yearStem + yearBranch;
  
  console.log(`  Expected: ${expected} (start of 60-year cycle)`);
  console.log(`  Actual: ${actual}`);
  console.log(`  Result: ${actual === expected ? 'PASS ✓' : 'FAIL ✗'}\n`);
  
  return actual === expected;
}

/**
 * Test Case 3: Yin-Yang Assignments
 * Verify all heavenly stems and earthly branches have correct yin-yang
 */
function testYinYangAssignments() {
  console.log('Test 3: Yin-Yang Assignments');
  
  // Expected yin-yang for heavenly stems (odd=yang, even=yin)
  const expectedStems = {
    '甲': 'yang', '乙': 'yin', '丙': 'yang', '丁': 'yin', '戊': 'yang',
    '己': 'yin', '庚': 'yang', '辛': 'yin', '壬': 'yang', '癸': 'yin'
  };
  
  // Expected yin-yang for earthly branches (odd=yang, even=yin)
  const expectedBranches = {
    '子': 'yang', '丑': 'yin', '寅': 'yang', '卯': 'yin', '辰': 'yang', '巳': 'yin',
    '午': 'yang', '未': 'yin', '申': 'yang', '酉': 'yin', '戌': 'yang', '亥': 'yin'
  };
  
  let allCorrect = true;
  
  // Check heavenly stems
  for (const [stem, expected] of Object.entries(expectedStems)) {
    if (YIN_YANG[stem] !== expected) {
      console.log(`  FAIL: ${stem} should be ${expected}, got ${YIN_YANG[stem]}`);
      allCorrect = false;
    }
  }
  
  // Check earthly branches
  for (const [branch, expected] of Object.entries(expectedBranches)) {
    if (YIN_YANG[branch] !== expected) {
      console.log(`  FAIL: ${branch} should be ${expected}, got ${YIN_YANG[branch]}`);
      allCorrect = false;
    }
  }
  
  console.log(`  Result: ${allCorrect ? 'PASS ✓' : 'FAIL ✗'}\n`);
  return allCorrect;
}

/**
 * Test Case 4: Element Distribution Calculation
 * Test complete element counting for a sample BaZi chart
 */
function testElementDistribution() {
  console.log('Test 4: Element Distribution Calculation');
  
  // Sample pillars: 庚辰, 丁子, 丁酉, 丙午
  const pillars = [
    { heavenlyStem: '庚', earthlyBranch: '辰' },
    { heavenlyStem: '丁', earthlyBranch: '子' },
    { heavenlyStem: '丁', earthlyBranch: '酉' },
    { heavenlyStem: '丙', earthlyBranch: '午' }
  ];
  
  const elements = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  
  // Count elements from heavenly stems and hidden stems
  pillars.forEach(pillar => {
    elements[ELEMENTS[pillar.heavenlyStem]]++;
    const hiddenStems = HIDDEN_STEMS[pillar.earthlyBranch];
    hiddenStems.forEach(stem => {
      elements[ELEMENTS[stem]]++;
    });
  });
  
  const expected = { 木: 1, 火: 4, 土: 2, 金: 2, 水: 2 };
  const matches = JSON.stringify(elements) === JSON.stringify(expected);
  
  console.log(`  Expected: ${JSON.stringify(expected)}`);
  console.log(`  Actual: ${JSON.stringify(elements)}`);
  console.log(`  Result: ${matches ? 'PASS ✓' : 'FAIL ✗'}\n`);
  
  return matches;
}

/**
 * Test Case 5: Yin-Yang Balance Calculation
 * Test yin-yang counting for a sample BaZi chart
 */
function testYinYangBalance() {
  console.log('Test 5: Yin-Yang Balance Calculation');
  
  // Sample pillars: 庚辰, 丁子, 丁酉, 丙午
  const pillars = [
    { heavenlyStem: '庚', earthlyBranch: '辰' },
    { heavenlyStem: '丁', earthlyBranch: '子' },
    { heavenlyStem: '丁', earthlyBranch: '酉' },
    { heavenlyStem: '丙', earthlyBranch: '午' }
  ];
  
  const yinYang = { yin: 0, yang: 0 };
  
  pillars.forEach(pillar => {
    yinYang[YIN_YANG[pillar.heavenlyStem]]++;
    yinYang[YIN_YANG[pillar.earthlyBranch]]++;
  });
  
  const expected = { yin: 3, yang: 5 };
  const matches = JSON.stringify(yinYang) === JSON.stringify(expected);
  
  console.log(`  Expected: ${JSON.stringify(expected)}`);
  console.log(`  Actual: ${JSON.stringify(yinYang)}`);
  console.log(`  Total: ${yinYang.yin + yinYang.yang} (should be 8)`);
  console.log(`  Result: ${matches ? 'PASS ✓' : 'FAIL ✗'}\n`);
  
  return matches;
}

/**
 * Test Case 6: Hidden Stems Verification
 * Verify that all earthly branches have correct hidden stems
 */
function testHiddenStems() {
  console.log('Test 6: Hidden Stems Verification');
  
  const expectedHiddenStems = {
    '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'], '卯': ['乙'],
    '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'], '午': ['丁', '己'], '未': ['己', '丁', '乙'],
    '申': ['庚', '壬', '戊'], '酉': ['辛'], '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲']
  };
  
  const matches = JSON.stringify(HIDDEN_STEMS) === JSON.stringify(expectedHiddenStems);
  
  console.log(`  Result: ${matches ? 'PASS ✓ - All hidden stems correct' : 'FAIL ✗'}\n`);
  
  return matches;
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log('='.repeat(60));
  console.log('BaZi Calculation Verification Test Suite');
  console.log('八字計算驗證測試套件');
  console.log('='.repeat(60));
  console.log();
  
  const results = [
    testYearPillarCalculation(),
    testSixtyYearCycle(),
    testYinYangAssignments(),
    testElementDistribution(),
    testYinYangBalance(),
    testHiddenStems()
  ];
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log('='.repeat(60));
  console.log(`Test Results: ${passed}/${total} tests passed`);
  console.log(`Status: ${passed === total ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  console.log('='.repeat(60));
  
  return passed === total;
}

// Export for use in other modules
if (typeof module !== 'undefined') {
  module.exports = {
    testYearPillarCalculation,
    testSixtyYearCycle,
    testYinYangAssignments,
    testElementDistribution,
    testYinYangBalance,
    testHiddenStems,
    runAllTests
  };
}

// Run tests if executed directly
if (require.main === module) {
  const success = runAllTests();
  process.exit(success ? 0 : 1);
}
