import { Tabcast } from './';

export type TabcastMessageEventListener<T> = <T>(
  this: Tabcast<T>,
  message: T
) => void;

export interface TabcastEvents<T> {
  message: Set<TabcastMessageEventListener<T>>;
}
