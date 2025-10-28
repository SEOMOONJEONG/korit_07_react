// 사용자 로그인 자격 증명 타입
export type AccountCredentials = {
  username: string;
  password: string;
}

// 받아올 때
export type ShoppingItem = {
  id: number;
  product: string;
  amount: string;
  purchased: boolean;
}

// 입력할 때
export type ShoppingItemEntry = {
  product: string;
  amount: string;
  purchased: boolean;
}
