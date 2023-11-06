import Image from "next/image";

import type { Session } from "@sasin91/auth";

import AddBox from "~/assets/game/ui/add_box_FILL0_wght700_GRAD0_opsz48.svg";
import BarcodeScanner from "~/assets/game/ui/barcode_scanner_FILL0_wght700_GRAD0_opsz48.svg";
import CurrencyYuan from "~/assets/game/ui/currency_yuan_FILL0_wght700_GRAD0_opsz48.svg";
import Database from "~/assets/game/ui/database_FILL0_wght700_GRAD0_opsz48.svg";
import DoubleArrow from "~/assets/game/ui/double_arrow_FILL0_wght700_GRAD0_opsz48.svg";
import EVShadow from "~/assets/game/ui/ev_shadow_FILL0_wght700_GRAD0_opsz48.svg";
import FlashOn from "~/assets/game/ui/flash_on_FILL0_wght700_GRAD0_opsz48.svg";
import Fluorescent from "~/assets/game/ui/fluorescent_FILL0_wght700_GRAD0_opsz48.svg";
import Paintball from "~/assets/game/ui/paintball.png";
import SafetyCheck from "~/assets/game/ui/safety_check_FILL0_wght700_GRAD0_opsz48.svg";
import Tenancy from "~/assets/game/ui/tenancy_FILL0_wght700_GRAD0_opsz48.svg";
import Token from "~/assets/game/ui/token_FILL0_wght700_GRAD0_opsz48.svg";

export default function GameUI({ session }: { session: Session }) {
  return (
    <div className="absolute left-0 top-0 h-full w-full" id="game-ui">
      <div className="bg-[rgba(1.0, 1.0, 1.0, 0.0)] absolute bottom-12 left-24 h-32 w-96 rounded-xl py-3">
        <div
          className="left-ui-area flex h-full w-full flex-col justify-end rounded-md border-4 shadow-lg"
          id="left-ui-area"
        >
          <div className="flex h-full w-full flex-row items-end justify-center">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="text-shadow text-4xl text-white" id="health">
                100
              </div>
              <div className="text-shadow text-4xl text-white" id="mana">
                100
              </div>
            </div>
            <div className="flex h-full flex-col items-center justify-center">
              <Image
                src={FlashOn}
                alt="Flashlight"
                className="ml-0.5 h-6 w-6 bg-contain drop-shadow invert"
              />
              <Image
                src={AddBox}
                alt="Box"
                className="ml-0.5 h-6 w-6 bg-contain drop-shadow invert"
              />
            </div>
            <div className="flex h-full flex-col items-center justify-center gap-1">
              <div className="ml-0.5 h-6 w-48">
                <div className="h-full rounded bg-red-500 shadow-md hover:shadow-lg"></div>
              </div>
              <div className="m-0.5 h-6 w-48">
                <div className="h-full rounded bg-blue-500 shadow-md hover:shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-64 right-28 h-28 w-96 rounded-lg bg-transparent pr-2 pt-2">
        <div
          className="perspective-600 rotate-y-30 rotate-z-3 flex h-full w-full transform flex-col justify-end rounded shadow-md"
          id="right-ui-area"
        >
          <div className="flex h-full w-full flex-row items-end justify-center">
            <div className="ml-2 flex h-full flex-col items-center justify-center">
              <div className="text-shadow min-h-[30px] text-white"></div>
              <div className="weapon-pic-text">25</div>
            </div>
            <div className="ml-2 flex h-full flex-col items-center justify-center">
              <Image
                src={CurrencyYuan}
                alt="currency"
                className="ml-0.5 h-6 min-h-[30px] w-6 bg-cover bg-no-repeat drop-shadow invert"
              />
              <Image
                src={SafetyCheck}
                alt="safety check"
                className="ml-0.5 h-8 w-8 bg-contain drop-shadow invert"
              />
            </div>
            <div className="ml-2 flex h-full flex-col items-center justify-center">
              <div>
                <div className="text-shadow h-4 min-h-[30px] text-white">
                  👋 {session.user.name}
                </div>
              </div>
              <Image
                src={Paintball}
                alt="paintball"
                className="h-10 w-28 bg-contain bg-no-repeat"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-28 top-12 h-28 w-96 bg-transparent pr-2.5 pt-2.5">
        <div
          className="perspective-600 -rotate-y-45 -rotate-z-3 flex h-full w-full transform flex-col justify-end rounded shadow-md"
          id="top-right-ui-area"
        >
          <div className="flex h-full w-full flex-row items-end justify-center">
            <Image className="mt-1" src={EVShadow} alt="EV shadow" />
            <Image className="mt-1" src={Tenancy} alt="Tenancy" />
            <Image className="mt-1" src={Fluorescent} alt="Fluorescent" />
            <Image className="mt-1" src={Database} alt="Database" />
            <Image
              className="mt-1"
              src={BarcodeScanner}
              alt="Barcode scanner"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-48 h-28 w-96 rounded-xl bg-transparent">
        <div className="text-center" id="top-left-ui-area">
          <div className="flex h-full w-full flex-row items-end justify-center">
            <Image
              className="drop-shadow invert"
              src={DoubleArrow}
              alt="double arrow"
            />
            <div className="text-shadow-md pr-3 pt-2 text-base text-white">
              Throw some balls
            </div>
          </div>
          <div className="flex h-full w-full min-w-[400px] flex-row items-center justify-center bg-gradient-to-r from-blue-300 via-transparent to-blue-900">
            <Image
              className="drop-shadow invert"
              height={32}
              src={Token}
              alt="Token"
            />
            <div className="text-shadow ml-2 mr-2 text-base text-gray-100">
              Jump around and stuff
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
