export type Channel = ChannelInfo & {
    id: string,
    owner: string,
    administrator: string[],
    userList: string[],
    invitedUsers: string[]
}

export type ChannelInfo = {
    title: string,
    password?: string,
    channelType: ChannelType,
    maxUsers: number,
}

export type ChannelType = 'public' | 'private' | 'protected';