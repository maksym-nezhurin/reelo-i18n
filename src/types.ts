// Auto-generated types for translation keys
// This file should be regenerated when translations change

import enCommon from '../locales/en/common.json';
import enAuth from '../locales/en/auth.json';
import enProfile from '../locales/en/profile.json';
import enMenu from '../locales/en/menu.json';
import enUsers from '../locales/en/users.json';
import enCars from '../locales/en/cars.json';
import enScrapper from '../locales/en/scrapper.json';
import enApi from '../locales/en/api.json';
import enTime from '../locales/en/time.json';
import enErrors from '../locales/en/errors.json';
import enSystem from '../locales/en/system.json';

// Merge all translation namespaces
export type TranslationResources = {
  common: typeof enCommon;
  auth: typeof enAuth;
  profile: typeof enProfile;
  menu: typeof enMenu;
  users: typeof enUsers;
  cars: typeof enCars;
  scrapper: typeof enScrapper;
  api: typeof enApi;
  time: typeof enTime;
  errors: typeof enErrors;
  system: typeof enSystem;
};

// Helper type to extract nested keys (with depth limit to avoid infinite recursion)
type NestedKeyOf<ObjectType extends object, Prefix extends string = ''> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? ObjectType[Key] extends any[]
      ? `${Prefix}${Key}`
      : `${Prefix}${Key}` | NestedKeyOf<ObjectType[Key], `${Prefix}${Key}.`>
    : `${Prefix}${Key}`;
}[keyof ObjectType & (string | number)];

// Extract all possible translation keys
export type TranslationKey = 
  | `common.${NestedKeyOf<typeof enCommon>}`
  | `auth.${NestedKeyOf<typeof enAuth>}`
  | `profile.${NestedKeyOf<typeof enProfile>}`
  | `menu.${NestedKeyOf<typeof enMenu>}`
  | `users.${NestedKeyOf<typeof enUsers>}`
  | `cars.${NestedKeyOf<typeof enCars>}`
  | `scrapper.${NestedKeyOf<typeof enScrapper>}`
  | `api.${NestedKeyOf<typeof enApi>}`
  | `time.${NestedKeyOf<typeof enTime>}`
  | `errors.${NestedKeyOf<typeof enErrors>}`
  | `system.${NestedKeyOf<typeof enSystem>}`;

// Supported languages
export type SupportedLanguage = 'en' | 'uk' | 'pl';

// Translation function options
export interface TranslationOptions {
  count?: number;
  [key: string]: string | number | undefined;
}
