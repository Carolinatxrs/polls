type Message = { pollOptionId: string, votes: number }
type Subscribe = (message: Message) => void

class VotingPubSub {
  private channels: Record<string, Subscribe[]> = {}

  subscribe(pollId: string, subscribe: Subscribe) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }

    this.channels[pollId].push(subscribe)
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return
    }

    for (const subscribe of this.channels[pollId]) {
      subscribe(message)
    }
  }
}

export const voting = new VotingPubSub()