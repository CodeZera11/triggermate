"use client"

import { useQueryAutomationPosts } from '@/hooks/use-queries';

type Props = {}

const PostButton = ({ }: Props) => {

  const { } = useQueryAutomationPosts();

  return (
    <div>PostButton</div>
  )
}

export default PostButton