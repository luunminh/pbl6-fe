const dataset = [
  {
    revenue: 59000,
    expense: 57000,
    month: 'Jan',
  },
  {
    revenue: 69000,
    expense: 96000,
    month: 'Feb',
  },
  {
    revenue: 24000,
    expense: 58000,
    month: 'Mar',
  },
  {
    revenue: 42000,
    expense: 98000,
    month: 'Apr',
  },
  {
    revenue: 25000,
    expense: 67000,
    month: 'May',
  },
  {
    revenue: 74000,
    expense: 50007,
    month: 'June',
  },
  {
    revenue: 25000,
    expense: 57000,
    month: 'July',
  },
  {
    revenue: 19000,
    expense: 77000,
    month: 'Aug',
  },
  {
    revenue: 68000,
    expense: 12000,
    month: 'Sept',
  },
  {
    revenue: 66000,
    expense: 22000,
    month: 'Oct',
  },
  {
    revenue: 77000,
    expense: 22000,
    month: 'Nov',
  },
  {
    revenue: 97000,
    expense: 57000,
    month: 'Dec',
  },
];

enum ChartSelect {
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

const chartSelectOptions = [
  {
    label: 'Weekly',
    value: ChartSelect.WEEKLY,
  },
  {
    label: 'Monthly',
    value: ChartSelect.MONTHLY,
  },
  {
    label: 'Yearly',
    value: ChartSelect.YEARLY,
  },
];

const dataKey = ['revenue', 'expense'];

// CHART PRODUCT

const getKeys = (arr) => {
  const keys = productDataSet.reduce((acc, obj) => {
    Object.keys(obj).forEach((key) => {
      if (!acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);

  return [...new Set(keys)].filter((key) => key !== 'month');
};

const productDataSet = [
  {
    ['Ba rọi heo']: 30,
    ['Ba roi béo']: 20,
    ['Ba roi beo ngon dai mềm']: 52,
    month: 'Jan',
  },
  {
    ['Ba rọi heo gà']: 44,
    ['Ba roi ốm']: 67,
    ['Ba roi beo ngon dai']: 122,
    month: 'Feb',
  },
  {
    ['Nước lọc']: 42,
    ['Ba roi']: 16,
    ['Ba roi beo ngon']: 24,
    month: 'Mar',
  },
  {
    ['Ba rọi heo G']: 21,
    ['Ba roi beo']: 64,
    ['Ba roi beo ngon dai']: 28,
    month: 'Apr',
  },
  {
    ['Ba rọi heo G']: 52,
    ['Ba roi beo']: 85,
    ['Ba roi beo ngon dai']: 154,
    month: 'May',
  },
  {
    ['Ba rọi heo G']: 22,
    ['Ba roi beo']: 68,
    ['Ba roi beo ngon dai']: 98,
    month: 'Jun',
  },
];

export { dataset, dataKey, chartSelectOptions, ChartSelect, productDataSet, getKeys };
