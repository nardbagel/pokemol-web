import { supportedChains } from './chain';
import { utils } from 'web3';

export const parseSummonresAndShares = (data) => {
  if (!data) {
    return [[], []];
  }
  const lines = data.split(/\r?\n/);
  const addrs = [];
  const amounts = [];
  lines.forEach((line) => {
    const summoner = line.split(/\s+/);
    addrs.push(summoner[0]);
    amounts.push(summoner[1]);
  });
  return [addrs, amounts];
};

export const validateSummonresAndShares = (data) => {
  const [addrs, amounts] = parseSummonresAndShares(data);
  let errMsg = true;
  if (!addrs.length || !amounts.length) {
    errMsg = 'Something went wrong with the summoner list';
    return errMsg;
  }
  addrs.forEach((addr) => {
    try {
      utils.toChecksumAddress(addr);
    } catch (err) {
      errMsg = err.message;
    }
  });

  amounts.forEach((amount) => {
    if (amount % 1 !== 0) {
      errMsg = 'Only whole share amounts allowed';
    }
  });
  return errMsg;
};

export const periodsPerDayPreset = (seconds) => {
  const hours = +seconds / 60 / 60;

  const perDay = Math.ceil(24 / hours);

  if (24 / hours < 1) {
    return `Less than ${perDay} per day`;
  } else {
    return `${perDay} per day`;
  }
};

export const formatPeriodLength = (periods, duration) => {
  const periodSeconds = +periods * duration;
  const days = periodSeconds / 60 / 60 / 24;
  return `${days} day${days > 1 ? 's' : ''}`;
};

export const formatDepositWei = (amount) => {
  return utils.fromWei(amount.toString(), 'ether');
};

export const daoConstants = (chainId) => {
  const constants = {
    abortWindow: '1',
    dilutionBound: '3',
    version: '2.1',
  };

  if (chainId === '0x64') {
    constants.approvedToken = supportedChains['0x64'].wxdai_contract;
  }

  return constants;
};

export const daoPresets = (chainId) => {
  let presets = [
    {
      presetName: 'Guilds',
      presetSubtitle: 'Work collectively to offer services',
      presetDescription:
        'Best for Worker Cooperatives with small to medium financial throughput.',
      currency: 'DAI',
      approvedToken: supportedChains[chainId].dai_contract,
      votingPeriod: '60',
      gracePeriod: '24',
      proposalDeposit: '5000000000000000000',
      processingReward: '2000000000000000000',
      periodDuration: '7200',
      summonerShares: 1,
      color: '#4FBF9F',
      version: '2.1',
    },
    {
      presetName: 'Clubs',
      presetSubtitle: 'Little to no financial decisions',
      presetDescription:
        'Hang with your friends and commrades to nerd out or just chill.',
      currency: 'DAI',
      approvedToken: supportedChains[chainId].dai_contract,
      votingPeriod: '4320',
      gracePeriod: '2880',
      proposalDeposit: '5000000000000000000',
      processingReward: '5000000000000000000',
      periodDuration: '60',
      summonerShares: 1,
      color: '#F16061',
      version: '2.1',
    },
    {
      presetName: 'Ventures',
      presetSubtitle: 'Large to XL financial decisions',
      presetDescription:
        'Invest on chain with a venture fund at your fingertips.',
      currency: 'WETH',
      approvedToken: supportedChains[chainId].weth_contract,
      votingPeriod: '7',
      gracePeriod: '7',
      proposalDeposit: '100000000000000000',
      processingReward: '10000000000000000',
      periodDuration: '86400',
      summonerShares: 1,
      color: '#AB3593',
      version: '2.1',
    },
    {
      presetName: 'Grants',
      presetSubtitle: 'Distribute wealth together',
      presetDescription: 'Spread around the wealth and accelerate good stuff.',
      currency: 'WETH',
      approvedToken: supportedChains[chainId].weth_contract,
      votingPeriod: '168',
      gracePeriod: '72',
      proposalDeposit: '10000000000000000',
      processingReward: '10000000000000000',
      periodDuration: '3600',
      summonerShares: 1,
      color: '#ea8923',
      version: '2.1',
    },

    {
      presetName: 'Products',
      presetSubtitle: 'Govern a Product or Protocol',
      presetDescription:
        'Raid together to get projects and products done in record time.',
      currency: 'DAI',
      approvedToken: supportedChains[chainId].dai_contract,
      votingPeriod: '60',
      gracePeriod: '36',
      proposalDeposit: '5000000000000000000',
      processingReward: '5000000000000000000',
      periodDuration: '7200',
      summonerShares: 1,
      color: '#513e97',
      version: '2.1',
    },
  ];

  if (chainId === '0x64') {
    presets = presets.map((preset) => {
      preset.currency = 'WXDAI';
      preset.approvedToken = supportedChains[chainId].wxdai_contract;
      preset.proposalDeposit = '100000000000000000';
      preset.processingReward = '10000000000000000';

      return preset;
    });
  }

  if (chainId === '0x89') {
    presets = presets.map((preset) => {
      preset.currency = 'WMATIC';
      preset.approvedToken = supportedChains[chainId].weth_contract;
      preset.proposalDeposit = '100000000000000000';
      preset.processingReward = '10000000000000000';

      return preset;
    });
  }

  if (chainId === '0x4a') {
    presets = presets.map((preset) => {
      preset.currency = 'WEIDI';
      preset.approvedToken = supportedChains[chainId].weth_contract;
      preset.proposalDeposit = '100000000000000000';
      preset.processingReward = '10000000000000000';

      return preset;
    });
  }
  return presets;
};

export const currencyOptions = (chainId) => {
  let options;

  if (chainId === '0x64') {
    options = [
      {
        value: 'WXDAI',
        label: 'WXDAI',
        address: supportedChains[chainId].wxdai_contract,
      },
    ];
  } else if (chainId === '0x89') {
    options = [
      {
        value: 'WMATIC',
        label: 'WMATIC',
        address: supportedChains[chainId].weth,
      },
      {
        value: 'DAI',
        label: 'DAI',
        address: supportedChains[chainId].dai_contract,
      },
    ];
  } else if (chainId === '0x4a') {
    options = [
      {
        value: 'WEIDI',
        label: 'WEIDI',
        address: supportedChains[chainId].weth,
      },
      {
        value: 'DAI',
        label: 'DAI',
        address: supportedChains[chainId].dai_contract,
      },
    ];
  } else {
    options = [
      {
        value: 'DAI',
        label: 'DAI',
        address: supportedChains[chainId].dai_contract,
      },
      {
        value: 'WETH',
        label: 'WETH',
        address: supportedChains[chainId].weth_contract,
      },
    ];
  }

  return options;
};
// V1 example
// depositToken: {tokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", symbol: "WETH", decimals: "18", __typename: "Token"}
// gracePeriodLength: "35"
// guildBankAddress: "0x211a94468ba1e379236b45ca42dc63ee93139c7e"
// id: "0x1fd169a4f5c59acf79d0fd5d91d1201ef1bce9f1"
// minions: []
// newContract: "1"
// periodDuration: "17280"
// processingReward: "100000000000000000"
// proposalDeposit: "10000000000000000000"
// summoner: "0x512e07a093aaa20ba288392eadf03838c7a4e522"
// summoningTime: "1550131297"
// title: "Moloch DAO"
// tokenBalances: []
// totalLoot: "0"
// totalShares: "4324"
// version: "1"
// votingPeriodLength: "35"
// __typename: "Moloch"

export const cloneDaoPresets = (daoOverview) => {
  return {
    votingPeriod: daoOverview.votingPeriodLength,
    gracePeriod: daoOverview.gracePeriodLength,
    proposalDeposit: daoOverview.proposalDeposit,
    processingReward: daoOverview.processingReward,
    periodDuration: daoOverview.periodDuration,
    // summonerShares: 1,
    version: 2.1,
  };
};
// const deleteLastCharacter = (string) => string.slice(0, string.length - 1);

export const cloneMembers = (daoMembers) =>
  daoMembers
    .reduce(
      (string, member) =>
        +member?.shares > 0
          ? string +
            `${member.memberAddress} ${member.shares}
`
          : string,
      '',
    )
    .trim();

export const cloneTokens = (daoOverview) => {
  const primaryTokenAddress = daoOverview.depositToken.tokenAddress;
  const otherTokensAddress = daoOverview.tokenBalances
    .map(({ token }) => token.tokenAddress)
    .filter((address) => address !== primaryTokenAddress);
  const allAddresses = [primaryTokenAddress, ...otherTokensAddress];
  return allAddresses.join(', ');
};
