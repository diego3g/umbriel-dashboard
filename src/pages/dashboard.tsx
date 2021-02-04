import Head from 'next/head'
import { Box, Flex, Heading, SimpleGrid, Text, color, Divider} from '@chakra-ui/react'

import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie } from 'recharts'

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

function CustomTooltip({ active, payload, label }) {
  if (active && payload && label) {
    return (
      <Box
        as="div" 
        bgColor="white" 
        p="4"
        maxWidth="48"
        shadow="0 0 20px rgba(0, 0, 0, 0.1)"
        borderRadius={4}
      >
        <Text fontWeight="medium">Data: {label}</Text>
        {payload.map(item => (
          <Text key={item.name} color="gray.600">{item.name}: {item.value}</Text>
        ))}
      </Box>
    );
  }

  return null;
};


export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Head>
        <title>Dashboard</title>
      </Head>

      <Header />

      <Flex my="6" flex="1">
        <Sidebar />

        <Box 
          flex="1"
          mr="8"
          borderRadius={4}
        >
          <Heading size="lg" fontWeight="medium">Painel</Heading>
          <Text mt="1" color="gray.400">Um overview sobre seu negócio</Text>
        
          <SimpleGrid mt="4" columns={3} gap="4">
            <Box
              as="div" 
              bgColor="white" 
              p="8"
              shadow="0 0 20px rgba(0, 0, 0, 0.05)"
              borderRadius={4}
            >
              <Text fontWeight="medium" fontSize="lg">Incritos da semana</Text>
              <Divider my="4" />
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={data} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <CartesianGrid stroke="#ddd" strokeDasharray="3 3" vertical={false} />
                  <XAxis fontSize={14} dataKey="name" />
                  <Tooltip cursor={{ fill: '#f5f5f5' }} content={CustomTooltip} />
                  <Bar dataKey="subscribers" stackId="a" fill="#805AD5" barSize={30} />
                  <Bar dataKey="new" stackId="a" fill="#ED64A6" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Box
              as="div" 
              bgColor="white" 
              p="8"
              shadow="0 0 20px rgba(0, 0, 0, 0.05)"
              borderRadius={4}
            >
              <Text fontWeight="medium" fontSize="lg">Taxa de abertura 
                <Text fontWeight="normal" fontSize="sm" display="inline" color="gray.500">
                  {' '}(por segmento)
                </Text>
              </Text>
              <Divider my="4" />
              <ResponsiveContainer width="100%" height={160}>
                <PieChart margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <Tooltip content={({ active, payload }) => {
                    console.log(active, payload)
                    if (!active || !payload) {
                      return null;
                    }

                    return (
                      <Box
                        as="div" 
                        bgColor="white" 
                        p="4"
                        maxWidth="48"
                        shadow="0 0 20px rgba(0, 0, 0, 0.1)"
                        borderRadius={4}
                      >
                        <Text fontWeight="medium" display="inline">{payload[0].name}:</Text>
                        <Text display="inline"> {payload[0].value}%</Text>
                      </Box>
                    )
                  }} />
                  <Pie data={segments} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box
              as="div" 
              bgColor="white" 
              p="8"
              shadow="0 0 20px rgba(0, 0, 0, 0.05)"
              borderRadius={4}
            >
              asd
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Flex>
  )
}
