import { Tabcast } from './';

export type TabcastMessageEventListener = <T>(
  this: Tabcast<T>,
  message: T
) => void;

export interface TabcastEvents {
  message: Set<TabcastMessageEventListener>;
}
