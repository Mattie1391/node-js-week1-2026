const fs = require('fs/promises');

// ========== 任務一：讀取會員清單 ==========
async function readMembers(filePath) {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

// ========== 任務二：篩選 VIP 會員 ==========
function filterVIP(members) {
  return members.filter((member) => member.level === 'VIP');
}

// ========== 任務三：計算會員剩餘點數總和 ==========
function sumCredits(members) {
  return members.reduce((total, member) => total + member.credits, 0);
}

// ========== 任務四：讀取環境變數 ==========
function getGymConfig() {
  return {
    gymName: process.env.GYM_NAME || '未命名健身房',
    adminName: process.env.ADMIN_NAME || '尚未指派',
    defaultMembersPath: process.env.DEFAULT_MEMBERS_PATH,
  };
}

// ========== 任務五：VIP 會員統計摘要（綜合題）==========
async function getVIPSummary(filePath) {
  const members = await readMembers(filePath);
  const vipMembers = filterVIP(members);
  const totalCredits = sumCredits(vipMembers);
  const names = vipMembers.map((member) => member.name);

  return {
    count: vipMembers.length,
    totalCredits,
    names,
  };
}

module.exports = {
  readMembers,
  filterVIP,
  sumCredits,
  getGymConfig,
  getVIPSummary,
};
