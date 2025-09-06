import { OSuit, type PlayingCardMeta } from '@/playing-cards/context/types';
import {
  Card2CSvg,
  Card2DSvg,
  Card2HSvg,
  Card2SSvg,
  Card3CSvg,
  Card3DSvg,
  Card3HSvg,
  Card3SSvg,
  Card4CSvg,
  Card4DSvg,
  Card4HSvg,
  Card4SSvg,
  Card5CSvg,
  Card5DSvg,
  Card5HSvg,
  Card5SSvg,
  Card6CSvg,
  Card6DSvg,
  Card6HSvg,
  Card6SSvg,
  Card7CSvg,
  Card7DSvg,
  Card7HSvg,
  Card7SSvg,
  Card8CSvg,
  Card8DSvg,
  Card8HSvg,
  Card8SSvg,
  Card9CSvg,
  Card9DSvg,
  Card9HSvg,
  Card9SSvg,
  CardACSvg,
  CardADSvg,
  CardAHSvg,
  CardASSvg,
  CardJCSvg,
  CardJDSvg,
  CardJHSvg,
  CardJSSvg,
  CardKCSvg,
  CardKDSvg,
  CardKHSvg,
  CardKSSvg,
  CardQCSvg,
  CardQDSvg,
  CardQHSvg,
  CardQSSvg,
  CardTCSvg,
  CardTDSvg,
  CardTHSvg,
  CardTSSvg,
} from './card-svgs';

// Clubs
export const CardAC: PlayingCardMeta = { suit: OSuit.Clubs, rank: 0, cardImg: CardACSvg };
export const Card2C: PlayingCardMeta = { suit: OSuit.Clubs, rank: 1, cardImg: Card2CSvg };
export const Card3C: PlayingCardMeta = { suit: OSuit.Clubs, rank: 2, cardImg: Card3CSvg };
export const Card4C: PlayingCardMeta = { suit: OSuit.Clubs, rank: 3, cardImg: Card4CSvg };
export const Card5C: PlayingCardMeta = { suit: OSuit.Clubs, rank: 4, cardImg: Card5CSvg };
export const Card6C: PlayingCardMeta = { suit: OSuit.Clubs, rank: 5, cardImg: Card6CSvg };
export const Card7C: PlayingCardMeta = { suit: OSuit.Clubs, rank: 6, cardImg: Card7CSvg };
export const Card8C: PlayingCardMeta = { suit: OSuit.Clubs, rank: 7, cardImg: Card8CSvg };
export const Card9C: PlayingCardMeta = { suit: OSuit.Clubs, rank: 8, cardImg: Card9CSvg };
export const CardTC: PlayingCardMeta = { suit: OSuit.Clubs, rank: 9, cardImg: CardTCSvg };
export const CardJC: PlayingCardMeta = { suit: OSuit.Clubs, rank: 10, cardImg: CardJCSvg };
export const CardQC: PlayingCardMeta = { suit: OSuit.Clubs, rank: 11, cardImg: CardQCSvg };
export const CardKC: PlayingCardMeta = { suit: OSuit.Clubs, rank: 12, cardImg: CardKCSvg };
export const AllCardsC = [Card2C, Card3C, Card4C, Card5C, Card6C, Card7C, Card8C, Card9C, CardTC, CardJC, CardQC, CardKC, CardAC];

// Diamonds
export const CardAD: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 0, cardImg: CardADSvg };
export const Card2D: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 1, cardImg: Card2DSvg };
export const Card3D: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 2, cardImg: Card3DSvg };
export const Card4D: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 3, cardImg: Card4DSvg };
export const Card5D: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 4, cardImg: Card5DSvg };
export const Card6D: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 5, cardImg: Card6DSvg };
export const Card7D: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 6, cardImg: Card7DSvg };
export const Card8D: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 7, cardImg: Card8DSvg };
export const Card9D: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 8, cardImg: Card9DSvg };
export const CardTD: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 9, cardImg: CardTDSvg };
export const CardJD: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 10, cardImg: CardJDSvg };
export const CardQD: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 11, cardImg: CardQDSvg };
export const CardKD: PlayingCardMeta = { suit: OSuit.Diamonds, rank: 12, cardImg: CardKDSvg };
export const AllCardsD = [Card2D, Card3D, Card4D, Card5D, Card6D, Card7D, Card8D, Card9D, CardTD, CardJD, CardQD, CardKD, CardAD];

// Hearts
export const CardAH: PlayingCardMeta = { suit: OSuit.Hearts, rank: 0, cardImg: CardAHSvg };
export const Card2H: PlayingCardMeta = { suit: OSuit.Hearts, rank: 1, cardImg: Card2HSvg };
export const Card3H: PlayingCardMeta = { suit: OSuit.Hearts, rank: 2, cardImg: Card3HSvg };
export const Card4H: PlayingCardMeta = { suit: OSuit.Hearts, rank: 3, cardImg: Card4HSvg };
export const Card5H: PlayingCardMeta = { suit: OSuit.Hearts, rank: 4, cardImg: Card5HSvg };
export const Card6H: PlayingCardMeta = { suit: OSuit.Hearts, rank: 5, cardImg: Card6HSvg };
export const Card7H: PlayingCardMeta = { suit: OSuit.Hearts, rank: 6, cardImg: Card7HSvg };
export const Card8H: PlayingCardMeta = { suit: OSuit.Hearts, rank: 7, cardImg: Card8HSvg };
export const Card9H: PlayingCardMeta = { suit: OSuit.Hearts, rank: 8, cardImg: Card9HSvg };
export const CardTH: PlayingCardMeta = { suit: OSuit.Hearts, rank: 9, cardImg: CardTHSvg };
export const CardJH: PlayingCardMeta = { suit: OSuit.Hearts, rank: 10, cardImg: CardJHSvg };
export const CardQH: PlayingCardMeta = { suit: OSuit.Hearts, rank: 11, cardImg: CardQHSvg };
export const CardKH: PlayingCardMeta = { suit: OSuit.Hearts, rank: 12, cardImg: CardKHSvg };
export const AllCardsH = [Card2H, Card3H, Card4H, Card5H, Card6H, Card7H, Card8H, Card9H, CardTH, CardJH, CardQH, CardKH, CardAH];

// Spades
export const CardAS: PlayingCardMeta = { suit: OSuit.Spades, rank: 0, cardImg: CardASSvg };
export const Card2S: PlayingCardMeta = { suit: OSuit.Spades, rank: 1, cardImg: Card2SSvg };
export const Card3S: PlayingCardMeta = { suit: OSuit.Spades, rank: 2, cardImg: Card3SSvg };
export const Card4S: PlayingCardMeta = { suit: OSuit.Spades, rank: 3, cardImg: Card4SSvg };
export const Card5S: PlayingCardMeta = { suit: OSuit.Spades, rank: 4, cardImg: Card5SSvg };
export const Card6S: PlayingCardMeta = { suit: OSuit.Spades, rank: 5, cardImg: Card6SSvg };
export const Card7S: PlayingCardMeta = { suit: OSuit.Spades, rank: 6, cardImg: Card7SSvg };
export const Card8S: PlayingCardMeta = { suit: OSuit.Spades, rank: 7, cardImg: Card8SSvg };
export const Card9S: PlayingCardMeta = { suit: OSuit.Spades, rank: 8, cardImg: Card9SSvg };
export const CardTS: PlayingCardMeta = { suit: OSuit.Spades, rank: 9, cardImg: CardTSSvg };
export const CardJS: PlayingCardMeta = { suit: OSuit.Spades, rank: 10, cardImg: CardJSSvg };
export const CardQS: PlayingCardMeta = { suit: OSuit.Spades, rank: 11, cardImg: CardQSSvg };
export const CardKS: PlayingCardMeta = { suit: OSuit.Spades, rank: 12, cardImg: CardKSSvg };
export const AllCardsS = [Card2S, Card3S, Card4S, Card5S, Card6S, Card7S, Card8S, Card9S, CardTS, CardJS, CardQS, CardKS, CardAS];
