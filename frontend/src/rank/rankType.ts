export type RankUserType = {
    intraNickname: string;
    rankScore: number;
    rank: number;
};

export type RankUserListProps = {
    rankUserList: RankUserType[];
};
 
export type RankUserProps = {
    rankUser: RankUserType;
    rank: number;
};