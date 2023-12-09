import React, { ReactNode } from 'react';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { emptyFunction, formatMoney } from '@shared';
import { COLOR_CODE, DateRangePicker, Select } from '@components';
import { chartSelectOptions, dataKey, dataset, getKeys, productDataSet } from './helpers';
import { ResponsiveBar } from '@nivo/bar';
import { cardStyles } from './styles';
import { LuScanLine } from 'react-icons/lu';
import { IoWalletOutline } from 'react-icons/io5';
import { CiMoneyBill } from 'react-icons/ci';
import { BsCart2 } from 'react-icons/bs';

const Dashboard: React.FC<Props> = ({}) => (
  <Container maxWidth="xl">
    <Stack sx={{ mb: 2, mt: 3 }}>
      <Typography variant="h3" fontWeight={600}>
        Dashboard
      </Typography>
    </Stack>
    <Stack my={3} gap={1} alignItems={'end'} p={3}>
      <Stack width={'20%'}>
        <Select
          placeholder="Select"
          onChange={emptyFunction}
          value={''}
          options={chartSelectOptions}
        />
      </Stack>
      <Stack height={'500px'} width={'100%'}>
        <Typography variant="h3" fontWeight={700} color={COLOR_CODE.GREY_500} pl={2}>
          Revenues/Expenses
        </Typography>
        <ResponsiveBar
          data={dataset}
          theme={{
            legends: {
              text: {
                fontFamily: 'Public Sans',
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'capitalize',
                fill: COLOR_CODE.GREY_300,
              },
            },
            axis: {
              legend: {
                text: {
                  fontFamily: 'Public Sans',
                  fontSize: 16,
                  fontWeight: 600,
                  fill: COLOR_CODE.GREY_500,
                },
              },
            },
            tooltip: {
              container: {
                borderRadius: 8,
                textTransform: 'capitalize',
              },
            },
          }}
          valueFormat=" >-$0,~s"
          keys={dataKey}
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          indexBy={'month'}
          groupMode="grouped"
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={[COLOR_CODE.PRIMARY_400, '#E697FF']}
          borderRadius={6}
          borderWidth={2}
          enableLabel={false}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.3]],
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Month',
            legendPosition: 'middle',
            legendOffset: 40,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Total',
            legendPosition: 'middle',
            legendOffset: -53,
            truncateTickAt: 0,
            format: ' >-$0,~s',
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 4,
              symbolBorderWidth: 4,
              symbolShape: 'square',
              symbolSpacing: 10,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              itemTextColor: COLOR_CODE.GREY_700,
            },
          ]}
        />
      </Stack>
    </Stack>
    <Stack gap={1} px={3} pb={5} alignItems={'end'}>
      <Stack width={'20%'}>
        <DateRangePicker />
      </Stack>
      <Grid container columnSpacing={3}>
        <Grid item xs={6}>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={6}>
              <Stack sx={{ ...cardStyles }}>
                <Stack p={0.5} bgcolor={COLOR_CODE.DANGER_BG} width={'28px'} borderRadius={1}>
                  <LuScanLine size={20} color={COLOR_CODE.DANGER} />
                </Stack>
                <Typography variant="body2" color={COLOR_CODE.GREY_600}>
                  Product Sold
                </Typography>
                <Typography variant="h3" fontWeight={700}>
                  300
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack sx={{ ...cardStyles }}>
                <Stack p={0.5} bgcolor={'#FAE1CF'} width={'28px'} borderRadius={1}>
                  <IoWalletOutline size={20} color={'#E46A11'} />
                </Stack>
                <Typography variant="body2" color={COLOR_CODE.GREY_600}>
                  Profit
                </Typography>
                <Typography variant="h3" fontWeight={700}>
                  {formatMoney(30000000)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack sx={{ ...cardStyles }}>
                <Stack p={0.5} bgcolor={COLOR_CODE.PRIMARY_200} width={'28px'} borderRadius={1}>
                  <CiMoneyBill size={20} color={COLOR_CODE.PRIMARY} />
                </Stack>
                <Typography variant="body2" color={COLOR_CODE.GREY_600}>
                  Revenue
                </Typography>
                <Typography variant="h3" fontWeight={700}>
                  {formatMoney(19000000)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack sx={{ ...cardStyles }}>
                <Stack p={0.5} bgcolor={COLOR_CODE.SUCCESS_BG} width={'28px'} borderRadius={1}>
                  <BsCart2 size={20} color={COLOR_CODE.SUCCESS} />
                </Stack>
                <Typography variant="body2" color={COLOR_CODE.GREY_600}>
                  Total Orders
                </Typography>
                <Typography variant="h3" fontWeight={700}>
                  300
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} height={'100%'}>
          <Stack width={'100%'} height={'100%'}>
            <Typography variant="h3" fontWeight={700} color={COLOR_CODE.GREY_500} pl={2}>
              Revenue by product
            </Typography>
            <ResponsiveBar
              data={productDataSet}
              theme={{
                legends: {
                  text: {
                    fontFamily: 'Public Sans',
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    fill: COLOR_CODE.GREY_300,
                  },
                },
                axis: {
                  legend: {
                    text: {
                      fontFamily: 'Public Sans',
                      fontSize: 16,
                      fontWeight: 600,
                      fill: COLOR_CODE.GREY_500,
                    },
                  },
                },
                tooltip: {
                  container: {
                    borderRadius: 8,
                    textTransform: 'capitalize',
                  },
                },
              }}
              keys={getKeys(productDataSet)}
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              indexBy={'month'}
              groupMode="stacked"
              layout="horizontal"
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={[
                COLOR_CODE.PRIMARY,
                COLOR_CODE.PRIMARY_400,
                '#03396c',
                '#005b96',
                COLOR_CODE.PRIMARY_600,
                COLOR_CODE.PRIMARY_200,
              ]}
              borderRadius={3}
              enableLabel={false}
              borderColor={{
                from: 'color',
                modifiers: [['darker', 0.5]],
              }}
              borderWidth={2}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Total Sold',
                legendPosition: 'middle',
                legendOffset: 40,
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 0,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Product Name',
                legendPosition: 'middle',
                legendOffset: -53,
                truncateTickAt: 0,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 2]],
              }}
            />
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  </Container>
);

type Props = {
  children?: ReactNode;
};

export default Dashboard;
