import { HStack, Text, StackDivider, Progress, Flex } from '@chakra-ui/react'
import { useMessageStats } from '../../services/hooks/useMessageStats'

type MessageStatsProps = {
  messageId: string;
}

export function MessageStats({ messageId }: MessageStatsProps) {
  const { data } = useMessageStats(messageId)

  return (
    <HStack mt="3" spacing="3" divider={<StackDivider borderColor="gray.200" />}>
      {data?.stats.recipientsCount && (
        <Flex alignItems="center">
          <Progress width="150px" colorScheme="pink" value={((data?.stats.deliverCount || 0)/data?.stats.recipientsCount) * 100} />
          <Text color="gray.500" ml="2">
            {`${data?.stats.deliverCount || 0}/${data?.stats.recipientsCount} destinatários`}
          </Text>
        </Flex>
      )}
      {data?.stats.openRate && <Text color="gray.500">{`${data?.stats.openRate}% de abertura`}</Text>}
      {data?.stats.clickRate && <Text color="gray.500">{`${data?.stats.clickRate}% de clicks`}</Text>}
      {data?.stats.clickCount && <Text color="gray.500">{`${data?.stats.clickCount} clicks`}</Text>}
    </HStack>
  )
}