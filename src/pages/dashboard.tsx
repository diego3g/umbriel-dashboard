import Head from 'next/head'
import { Box, Flex, SimpleGrid, Text, Divider, useColorModeValue, theme } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

const data = [
  {
    name: '01/04', 
    subscribers: 4000,
    new: 54,
  },
  {
    name: '02/04', 
    subscribers: 3000,
    new: 1400,
  },
  {
    name: '03/04', 
    subscribers: 2000,
    new: 3000,
  },
  {
    name: '04/04', 
    subscribers: 2780,
    new: 400,
  },
  {
    name: '05/04', 
    subscribers: 1890,
    new: 400,
  },
  {
    name: '06/04', 
    subscribers: 2390,
    new: 812,
  },
  {
    name: '07/04', 
    subscribers: 3490,
    new: 321,
  },
];

const segments = [
  {
    "name": "Segmento A",
    "value": 25
  },
  {
    "name": "Segmento B",
    "value": 10
  },
  {
    "name": "Segmento C",
    "value": 5
  },
  {
    "name": "Segmento D",
    "value": 54
  },
  {
    "name": "Segmento E",
    "value": 20
  },
  {
    "name": "Segmento F",
    "value": 30
  }
]


const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2018-04-19T00:00:00.000Z",
      "2018-05-19T01:30:00.000Z",
      "2018-06-19T02:30:00.000Z",
      "2018-07-19T03:30:00.000Z",
      "2018-08-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z"
    ]
  },
  tooltip: {
    enabled: false
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  }
}

const series = [{
  name: 'series1',
  data: [31, 120, 28, 51, 18, 109]
}]


function CustomTooltip({ active, payload, label }) {
  const textColor = useColorModeValue("gray.700", "gray.50")
  const shapeBg = useColorModeValue("white", "gray.800")

  const altTextColor = useColorModeValue("gray.600", "gray.300")
  
  if (active && payload && label) {
    return (
      <Box
        as="div" 
        bgColor={shapeBg}
        p="4"
        maxWidth="48"
        shadow="0 0 20px rgba(0, 0, 0, 0.1)"
        borderRadius={4}
      >
        <Text fontWeight="medium" color={textColor}>Data: {label}</Text>
        {payload.map(item => (
          <Text key={item.name} color={altTextColor}>{item.name}: {item.value}</Text>
        ))}
      </Box>
    );
  }

  return null;
};


export default function Dashboard() {  
  const textColor = useColorModeValue("gray.700", "gray.50")
  const shapeBg = useColorModeValue("white", "gray.800")

  return (
    <Flex 
      direction="column"
    >
      <Head>
        <title>Dashboard</title>
      </Head>

      <Header />

      <Flex my="6" width="100%" maxWidth={1480} marginX="auto" px="6">
        <Sidebar />

        <SimpleGrid 
          flex="1"
          mr="8"
          borderRadius={4}
          columns={3}
          minChildWidth="320px"
          gap="4"
          alignItems="flex-start"
        >
          <Box
            as="div" 
            bgColor={shapeBg}
            p={["6", "8"]}
            shadow="0 0 20px rgba(0, 0, 0, 0.05)"
            borderRadius={4}
          >
            <Text fontWeight="medium" fontSize="lg" color={textColor}>Inscritos da semana</Text>
            <Chart
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>
          <Box
            as="div" 
            bgColor={shapeBg}
            p={["6", "8"]}
            shadow="0 0 20px rgba(0, 0, 0, 0.05)"
            borderRadius={4}
          >
            <Text fontWeight="medium" fontSize="lg" color={textColor}>Taxa de abertura</Text>
            <Chart
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>
          <Box
            as="div" 
            bgColor={shapeBg}
            p={["6", "8"]}
            shadow="0 0 20px rgba(0, 0, 0, 0.05)"
            borderRadius={4}
          >
            <Text fontWeight="medium" fontSize="lg" color={textColor}>Outros dados</Text>
            <Chart
              options={options}
              series={series}
              type="area"
              height={160}
            />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}
