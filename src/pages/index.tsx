import localFont from 'next/font/local';
import { useEffect, useState } from 'react';
import {
  DEFAULT_MENUS,
  DESSERTS,
  EMOJIS,
  MAEJIRI_MENUS,
  STONE_I_MENUS,
} from '@/list/menus.list';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

type MenuLabelType = '지메추' | '지디추' | '스메추' | '매메추';

type MenuType = {
  label: MenuLabelType;
  description: string;
  menus: string[];
};

const MENU_TYPE: MenuType[] = [
  {
    label: '지메추',
    description: '지나의 메뉴 추천',
    menus: DEFAULT_MENUS,
  },
  {
    label: '지디추',
    description: '지나의 디저트 추천',
    menus: DESSERTS,
  },
  {
    label: '스메추',
    description: '스톤아이 저녁 메뉴 추천',
    menus: STONE_I_MENUS,
  },
  {
    label: '매메추',
    description: '매지리 메뉴 추천',
    menus: MAEJIRI_MENUS,
  },
];

const TypeSelect = ({
  selectedMenuType,
  onClickMenuLabel,
}: {
  selectedMenuType?: MenuType;
  onClickMenuLabel: (label: MenuLabelType) => void;
}) => {
  const labels = MENU_TYPE.map((menu) => menu.label);

  return (
    <div className={'flex flex-col gap-2 '}>
      <div
        className={
          ' gap-2 justify-center grid grid-cols-2 grid-rows-2 md:flex md:flex-row'
        }
      >
        {labels.map((label, index) => (
          <p
            key={index}
            onClick={() => onClickMenuLabel(label)}
            className={`w-fit text-center m-auto text:md font-bold cursor-pointer p-2 rounded-2xl ${selectedMenuType?.label === label ? `bg-blue-200 dark:bg-emerald-900` : ''} md:text-2xl`}
          >
            {label}
          </p>
        ))}
      </div>
      <p className={'text-center text-sm md:text-xl'}>
        {selectedMenuType?.description ?? ''}
      </p>
    </div>
  );
};

const SelectedMenus = ({
  selectedMenuType,
  selectedMenu,
  setSelectedMenu,
}: {
  selectedMenuType?: MenuType;
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}) => {
  if (!selectedMenuType) return null;

  return (
    <div className={'flex gap-12 flex-col justify-center overflow-hidden'}>
      <div
        key={selectedMenuType.label}
        className={
          'pt-4 text-center flex gap-4 animate-infinite-scroll md:text-3xl md:pt-10'
        }
      >
        {selectedMenuType.menus?.map((menu, index) => (
          <div
            key={menu + index}
            className={'flex flex-shrink-0 text-xl font-medium'}
          >
            {menu}
          </div>
        ))}
      </div>

      <div className={'flex flex-row align-middle justify-center gap-3'}>
        <p
          className={`text-lg font-bold text-center cursor-pointer md:text-2xl ${!selectedMenu ? 'animate-zzz' : ''}`}
          onClick={() => {
            const randomValues =
              selectedMenuType?.menus[
                Math.floor(Math.random() * selectedMenuType?.menus.length)
              ];
            setSelectedMenu(randomValues);
          }}
        >
          추천받기
        </p>
      </div>

      <p
        className={
          'text-4xl break-keep font-extrabold text-center pb-10 md:pt-20 md:text-6xl'
        }
      >
        {selectedMenu +
          (selectedMenu && EMOJIS[Math.floor(Math.random() * EMOJIS.length)])}
      </p>
    </div>
  );
};

export default function Home() {
  const [selectedMenuLabel, setSelectedMenuLabel] =
    useState<MenuLabelType | null>(null);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [selectedMenuType, setSelectedMenuType] = useState<
    MenuType | undefined
  >(undefined);

  useEffect(() => {
    setSelectedMenuType(
      MENU_TYPE.find((menu) => menu.label === selectedMenuLabel),
    );
  }, [selectedMenuLabel]);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex items-center justify-items-center min-h-screen 
     p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]`}
    >
      <div className={'justify-center flex w-full'}>
        <div
          className={
            'w-[100%] justify-center align-middle bg-white dark:bg-[#1f1f2a] md:w-[500px] rounded-[20px] shadow-2xl'
          }
        >
          <div
            className={'p-10 min-h-[400px] flex flex-col gap-5 md:h-[800px] '}
          >
            <div className={'pb-10 gap-1 flex flex-col'}>
              <p
                className={
                  'font-bold text-xl text-center  pt-2 break-keep text-wrap md:text-3xl'
                }
              >
                🐷 지나의 추천 메뉴 🐷
              </p>
              {!selectedMenuType && (
                <p className={'text-sm text-center italic'}>
                  추천받을 메뉴 타입을 골라보세요!
                </p>
              )}
            </div>

            <TypeSelect
              selectedMenuType={selectedMenuType}
              onClickMenuLabel={(label: MenuLabelType) => {
                setSelectedMenu('');
                setSelectedMenuLabel(label);
              }}
            />

            <SelectedMenus
              selectedMenuType={selectedMenuType}
              selectedMenu={selectedMenu}
              setSelectedMenu={setSelectedMenu}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
