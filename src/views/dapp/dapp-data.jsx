import React from 'react'
import sero from "../../sero.png";

const popupDataEn = [

    {
        icon: <div className="dapp-icon"><img src={sero}  className="dapp-img"/></div>,
        text: `Explorer`,
        url:"https://explorer.sero.cash",
    },
    {
        icon: <div className="dapp-icon"><img src={sero}  className="dapp-img"/></div>,
        text: `Wiki`,
        url:"https://wiki.sero.cash",
    }
]


const popupDataCn = [
    {
        icon: <div className="dapp-icon"><img src={sero}  className="dapp-img"/></div>,
        text: `Explorer`,
        url:"http://118.24.17.141:8081/",
    },
    {
        icon: <div className="dapp-icon"><img src={sero}  className="dapp-img"/></div>,
        text: `Wiki`,
        url:"https://wiki.sero.cash",
    },
]


const versionControlDataEn = [
    {
        icon: <div className="dapp-icon"><img src="https://asnowhero.github.io/asnow-popup/logo.png"  className="dapp-img"/></div>,
        text: `ASNOW`,
        url:"https://asnowhero.github.io/asnow-popup",
    },
    {
        icon: <div className="dapp-icon"><img src="http://sanguo.artfuture.store/slg/icon.png"  className="dapp-img"/></div>,
        text: `超零三国`,
        url:"http://sanguo.artfuture.store/slg/slg.html",
    },
    {
        icon: <div className="dapp-icon"><img src="http://47.92.113.69/logo.png"  className="dapp-img"/></div>,
        text: `ACES`,
        url:"http://47.92.113.69/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://alpha-live.github.io/alpha/logo.png"  className="dapp-img"/></div>,
        text: `ALPHA`,
        url:"https://alpha-live.github.io/alpha/",
    },
    {
        icon: <div className="dapp-icon"><img src="http://liutyler.gitee.io/goFighting/logo.png"  className="dapp-img"/></div>,
        text: `GO Fighting`,
        url:"http://liutyler.gitee.io/goFighting",
    },
    {
        icon: <div className="dapp-icon"><img src="http://table.supernode.vip:3000/logo192.png"  className="dapp-img"/></div>,
        text: `Table Game`,
        url:"http://table.supernode.vip:3000/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://edenworkroom.gitee.io/market/logo.png"  className="dapp-img"/></div>,
        text: `Rhino Market`,
        url:"https://edenworkroom.gitee.io/market/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://fpsc2019.github.io/fpsc-popup/logo.png"  className="dapp-img"/></div>,
        text: `HAPY`,
        url:"https://fpsc2019.github.io/fpsc-popup/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://ubsgame.github.io/ubs/logo.png"  className="dapp-img"/></div>,
        text: `UBS`,
        url:"https://ubsgame.github.io/ubs/index.html?v=2",
    },
    {
        icon: <div className="dapp-icon"><img src="https://add-plus.github.io/add/logo.png"  className="dapp-img"/></div>,
        text: `ADD`,
        url:"https://add-plus.github.io/add/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://delos888.github.io/WESTWORLD/logo.png"  className="dapp-img"/></div>,
        text: `WESTWORLD`,
        url:"https://delos888.github.io/WESTWORLD/index.html",
    },
    {
        icon: <div className="dapp-icon"><img src="https://88fero.github.io/fero/logo.png"  className="dapp-img"/></div>,
        text: `FERO`,
        url:"https://88fero.github.io/fero/index.html",
    },
    {
        icon: <div className="dapp-icon"><img src="https://edenworkroom.github.io/stoken/logo.png"  className="dapp-img"/></div>,
        text: `SToken`,
        url:"https://edenworkroom.github.io/stoken/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://paretogame.com/logo.png"  className="dapp-img"/></div>,
        text: `Pareto Game`,
        url:"https://paretogame.com",
    },
    {
        icon: <div className="dapp-icon"><img src="https://seroclub.gitee.io/game/static/logo.png"  className="dapp-img"/></div>,
        text: `SERO CLUB`,
        url:"https://seroclub.gitee.io/game/",
    }
];


const versionControlDataCn = [
    {
        icon: <div className="dapp-icon"><img src="https://asnowhero.gitee.io/asnow-popup/logo.png"  className="dapp-img"/></div>,
        text: `ASNOW`,
        url:"https://asnowhero.gitee.io/asnow-popup/",
    },
    {
        icon: <div className="dapp-icon"><img src="http://sanguo.artfuture.store/slg/icon.png"  className="dapp-img"/></div>,
        text: `超零三国`,
        url:"http://sanguo.artfuture.store/slg/slg.html",
    },
    {
        icon: <div className="dapp-icon"><img src="http://47.92.113.69/logo.png"  className="dapp-img"/></div>,
        text: `ACES`,
        url:"http://47.92.113.69/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://alpha-live.gitee.io/alpha/logo.png"  className="dapp-img"/></div>,
        text: `ALPHA`,
        url:"https://alpha-live.gitee.io/alpha/index.html",
    },
    {
        icon: <div className="dapp-icon"><img src="http://liutyler.gitee.io/goFighting/logo.png"  className="dapp-img"/></div>,
        text: `GO Fighting`,
        url:"http://liutyler.gitee.io/goFighting",
    },
    {
        icon: <div className="dapp-icon"><img src="http://table.supernode.vip:3000/logo192.png"  className="dapp-img"/></div>,
        text: `Table Game`,
        url:"http://table.supernode.vip:3000/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://edenworkroom.gitee.io/market/logo.png"  className="dapp-img"/></div>,
        text: `Rhino Market`,
        url:"https://edenworkroom.gitee.io/market/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://fpsc2020.gitee.io/fpsc-popup/logo.png"  className="dapp-img"/></div>,
        text: `HAPY`,
        url:"https://fpsc2020.gitee.io/fpsc-popup/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://ubsgame.gitee.io/ubs/logo.png"  className="dapp-img"/></div>,
        text: `UBS`,
        url:"https://ubsgame.gitee.io/ubs/index.html?v=2",
    },
    {
        icon: <div className="dapp-icon"><img src="https://add-plus.gitee.io/add/logo.png"  className="dapp-img"/></div>,
        text: `ADD`,
        url:"https://add-plus.gitee.io/add/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://delos.gitee.io/westworld/logo.png"  className="dapp-img"/></div>,
        text: `WESTWORLD`,
        url:"https://delos.gitee.io/westworld/index.html",
    },
    {
        icon: <div className="dapp-icon"><img src="https://fero_1_slingyo5228.gitee.io/fero/logo.png"  className="dapp-img"/></div>,
        text: `FERO`,
        url:"https://fero_1_slingyo5228.gitee.io/fero",
    },
    {
        icon: <div className="dapp-icon"><img src="https://edenworkroom.gitee.io/stoken/logo.png"  className="dapp-img"/></div>,
        text: `SToken`,
        url:"https://edenworkroom.gitee.io/stoken/",
    },
    {
        icon: <div className="dapp-icon"><img src="https://paretogame.com/logo.png"  className="dapp-img"/></div>,
        text: `Pareto Game`,
        url:"https://paretogame.com",
    },
    {
        icon: <div className="dapp-icon"><img src="https://seroclub.gitee.io/game/static/logo.png"  className="dapp-img"/></div>,
        text: `SERO CLUB`,
        url:"https://seroclub.gitee.io/game/",
    }
];

export {
    versionControlDataEn,versionControlDataCn,popupDataEn,popupDataCn
}