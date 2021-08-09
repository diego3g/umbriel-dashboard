import { HStack, Text, StackDivider } from '@chakra-ui/react'
import { useMessageStats } from '../../services/hooks/useMessageStats'

type MessageStatsProps = {
  messageId: string;
}

export function MessageStats({ messageId }: MessageStatsProps) {
  const { data } = useMessageStats(messageId)

  return (
    <HStack mt="3" spacing="3" divider={<StackDivider borderColor="gray.200" />}>
      {data?.stats.recipientsCount && <Text color="gray.500">{`${data?.stats.recipientsCount} destinatários`}</Text>}
      {data?.stats.openRate && <Text color="gray.500">{`${data?.stats.openRate}% de abertura`}</Text>}
      {data?.stats.clickRate && <Text color="gray.500">{`${data?.stats.clickRate}% de clicks`}</Text>}
      {data?.stats.clickCount && <Text color="gray.500">{`${data?.stats.clickCount} clicks`}</Text>}
    </HStack>
  )
}