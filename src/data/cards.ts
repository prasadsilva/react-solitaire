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
import { OSuit, type PlayingCardDescriptor } from './types';

// Clubs
export const CardAC: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 0, cardImg: CardACSvg };
export const Card2C: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 1, cardImg: Card2CSvg };
export const Card3C: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 2, cardImg: Card3CSvg };
export const Card4C: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 3, cardImg: Card4CSvg };
export const Card5C: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 4, cardImg: Card5CSvg };
export const Card6C: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 5, cardImg: Card6CSvg };
export const Card7C: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 6, cardImg: Card7CSvg };
export const Card8C: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 7, cardImg: Card8CSvg };
export const Card9C: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 8, cardImg: Card9CSvg };
export const CardTC: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 9, cardImg: CardTCSvg };
export const CardJC: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 10, cardImg: CardJCSvg };
export const CardQC: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 11, cardImg: CardQCSvg };
export const CardKC: PlayingCardDescriptor = { suit: OSuit.Clubs, rank: 12, cardImg: CardKCSvg };
export const AllCardsC = [Card2C, Card3C, Card4C, Card5C, Card6C, Card7C, Card8C, Card9C, CardTC, CardJC, CardQC, CardKC, CardAC];

// Diamonds
export const CardAD: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 0, cardImg: CardADSvg };
export const Card2D: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 1, cardImg: Card2DSvg };
export const Card3D: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 2, cardImg: Card3DSvg };
export const Card4D: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 3, cardImg: Card4DSvg };
export const Card5D: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 4, cardImg: Card5DSvg };
export const Card6D: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 5, cardImg: Card6DSvg };
export const Card7D: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 6, cardImg: Card7DSvg };
export const Card8D: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 7, cardImg: Card8DSvg };
export const Card9D: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 8, cardImg: Card9DSvg };
export const CardTD: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 9, cardImg: CardTDSvg };
export const CardJD: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 10, cardImg: CardJDSvg };
export const CardQD: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 11, cardImg: CardQDSvg };
export const CardKD: PlayingCardDescriptor = { suit: OSuit.Diamonds, rank: 12, cardImg: CardKDSvg };
export const AllCardsD = [Card2D, Card3D, Card4D, Card5D, Card6D, Card7D, Card8D, Card9D, CardTD, CardJD, CardQD, CardKD, CardAD];

// Hearts
export const CardAH: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 0, cardImg: CardAHSvg };
export const Card2H: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 1, cardImg: Card2HSvg };
export const Card3H: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 2, cardImg: Card3HSvg };
export const Card4H: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 3, cardImg: Card4HSvg };
export const Card5H: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 4, cardImg: Card5HSvg };
export const Card6H: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 5, cardImg: Card6HSvg };
export const Card7H: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 6, cardImg: Card7HSvg };
export const Card8H: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 7, cardImg: Card8HSvg };
export const Card9H: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 8, cardImg: Card9HSvg };
export const CardTH: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 9, cardImg: CardTHSvg };
export const CardJH: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 10, cardImg: CardJHSvg };
export const CardQH: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 11, cardImg: CardQHSvg };
export const CardKH: PlayingCardDescriptor = { suit: OSuit.Hearts, rank: 12, cardImg: CardKHSvg };
export const AllCardsH = [Card2H, Card3H, Card4H, Card5H, Card6H, Card7H, Card8H, Card9H, CardTH, CardJH, CardQH, CardKH, CardAH];

// Spades
export const CardAS: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 0, cardImg: CardASSvg };
export const Card2S: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 1, cardImg: Card2SSvg };
export const Card3S: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 2, cardImg: Card3SSvg };
export const Card4S: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 3, cardImg: Card4SSvg };
export const Card5S: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 4, cardImg: Card5SSvg };
export const Card6S: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 5, cardImg: Card6SSvg };
export const Card7S: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 6, cardImg: Card7SSvg };
export const Card8S: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 7, cardImg: Card8SSvg };
export const Card9S: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 8, cardImg: Card9SSvg };
export const CardTS: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 9, cardImg: CardTSSvg };
export const CardJS: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 10, cardImg: CardJSSvg };
export const CardQS: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 11, cardImg: CardQSSvg };
export const CardKS: PlayingCardDescriptor = { suit: OSuit.Spades, rank: 12, cardImg: CardKSSvg };
export const AllCardsS = [Card2S, Card3S, Card4S, Card5S, Card6S, Card7S, Card8S, Card9S, CardTS, CardJS, CardQS, CardKS, CardAS];
