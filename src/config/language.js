import {keys, storage} from "./common";

class Language {

    e = () => {
        let tLang = storage.get(keys.settings.language);
        if (!tLang) {
            let localUtc = new Date().getTimezoneOffset() / 60;
            if (localUtc === -8) {
                storage.set(keys.settings.language, "zh_CN")
                return this.zh_CN;
            } else {
                storage.set(keys.settings.language, "en_US")
                return this.en_US;
            }
        } else {
            if (tLang === "en_US") {
                return this.en_US;
            } else if (tLang === "zh_CN") {
                return this.zh_CN;
            } else {
                return this.en_US;
            }
        }
    }

    en_US = {

        button: {
            confirm: "Confirm",
            cancel: "Cancel",
            next: "Next",
            receive: "Receive",
            transfer: "Transfer",
            add: "Add",
            save: "Save",
            deleteAddress: "Delete Address",
            createWallet: "Create Wallet",
            importWallet: "Import Wallet",
            create: "Create",
            done: "Done",
            import: "Import",
            ok: "OK",
            openTip: "Open on October 31",
        },

        navbar: {
            wallet: "Wallet",
            dapp: "DApp",
            my: "My",
        },

        toast: {
            info: {
                quitApp: "Press again to exit App !",
                createWallet: "Please create wallet first !"
            },
            success: {
                add: "Add Successfully",
                copy: "Copy Successfully",
                create: "Create Wallet Successfully",
                export: "Export Successfully",
                save: "Save Successfully",
                import: "Import Successfully",
                send: "Send Successfully",
                clear: "Clear Successfully"
            },
            loading: {
                creating: "Creating...",
                exporting: "Exporting...",
                importing: "Importing...",
                sending: "Sending..."
            },
            error: {
                passwordVerify: "Password at least 8 characters!",
                passwordNotMatch: "Password do not match!",
                incorrectOrder: "Incorrect order of Mnemonic Phrase!",
                invalidAddress: "Invalid Address!",
                accountExisted: "The account has existed!",
                notEnough: "The balance is not enough!",
                passwordError: "Password is incorrect!",
                notEnoughFee: "Not enough SERO to pay gas fee !"
            }
        },

        modal: {
            help: "Help",
            sure: "Are you sure???",
            mainPKr: "This is a collection address that can be used for frequent collections such as mining.",
            pkr: "The collection address will change after each successful transaction.",
            createWallet: "Create Wallet",
            importWallet: "Import Wallet",
            clearData:"Clear app data",
            confirmClear:"Please confirm that you have backed up your account. Cleared will resynchronize transaction data",
            clearTip:'Click "Confirm" to start syncing data. There may be a white screen during the process. Please wait patiently for data synchronization to complete, do not end the process easily.'
        },

        page: {
            wallet: {
                mainPKr: "mainPKr",
                PKr: "PKr",
                Assets: "Assets",
                selectWallet: "Select Wallet",
            },

            txList: {
                all: "All",
                out: "Out",
                in: "In",
                noData: "No data",
            },

            txDetail: {
                title: "Transaction info",
                success: "Success",
                pending: "Pending",
                amount: "Amount",
                fee: "Fee",
                from: "From",
                to: "To",
                hash: "Hash",
                block: "Block",
                goto: "Go to block explorer for more details >"
            },

            txTransfer: {
                balance: "Balance",
                address: "Address",
                inputAmount: "Input Amount",
                inputAddress: "Please Input SERO Address",
                fee: "Fee",
                total: "Total",
                amount: "Amount",
                gas: "Gas",
                gasPrice: "Gas Price",
                inputPassword: "Input Password",
                passwordMsg: "Your account password"
            },

            addressBook: {
                title: "Address book",
                add: "Add Address",
                name: "Name",
                address: "Address",
                description: "Description(optional)",
                detail: "Address Detail",
            },

            walletManage: {
                mainPKr: "MainPKr",
                PKr: "PKr",
                passwordHint: "Password hint",
                export: "Export Mnemonic Phrase",
                password: "Input password",
                changePasswordHint: "Change Password Hint",
                changeProfilePhoto: "Change Profile Photo",
                changeWalletName: "Change Wallet Name",
            },

            setting: {
                language: "Language",
                unit: "Currency Unit",
                node: "Node Settings",
                pkr: "Check synchronization status"
            },

            create: {
                import: "Import",
                step1: {
                    title: "Create SERO Wallet",
                    walletName: "Wallet Name",
                    password: "Password",
                    rePassword: "Repeat Password",
                    hint: "Password hint(optional)",
                    passwordTips: "At least 8 characters, recommended to mix uppercase and lowercase alphabets, numbers and symbols"
                },
                step2: {
                    title: "Backup Tips",
                    d1: "Obtaining Mnemonic equals owning all assets",
                    d2: "Backup Mnemonic",
                    d3: "Please write down the Mnemonic . If your phone is lost, stolen, damaged, the Mnemonic will be able to recover your assets",
                    d4: "Offline storage",
                    d5: "Please save it in a secure place, isolated from the internet . Please do not share or store the Mnemonic in a network environment, such as email, albums, social apps and others.",
                    d6: "Do not take screenshot .",
                    d7: "Please do not share or store the screenshots, which may be collected by third-party, resulting in loss of assets.",
                },
                step3: {
                    title: "Backup Mnemonic Phrase",
                    d1: "Please transcribe the Mnemonic phrase properly and back up it securely",
                },
                step4: {
                    title: "Confirm",
                    d1: "Please select Mnemonic Phrase in correct order",
                },
            },
            import: {
                tips: "You can reset the password while importing the Mnemonic Phrase",
                inputTips: "Enter mnemonic phrases separated by spaces",
                name: "Wallet Name",
                password: "Wallet Password",
                rePassword: "Repeat Password",
                hint: "Password hint",
            },
            my: {
                addressBook: "Address Book",
                walletManage: "Wallet Manage",
                settings: "Settings",
                termOfUse: "Term of use",
                about: "About us",
                clear: "Clear app data",

                address: {
                    name: "Name",
                    address: "Address",
                    description: "Description(optional)",
                    add: "Add Address",
                    edit: "Edit Address",
                    detail: "Address detail"
                },
                manage: {
                    mainPKr: "MainPKr",
                    pkr: "PKr",
                    hint: "Password hint",
                    export: "Export Mnemonic Phrase"
                },

            },
            dapp:{
                search:"Enter DApp url",
                invalidDApp:"Invalid DApp url",
                recent:"Recent",
                recommended:"Recommended",
            }

        }
    };


    zh_CN = {
        button: {
            confirm: "确认",
            cancel: "取消",
            next: "下一步",
            receive: "收款",
            transfer: "交易",
            add: "增加",
            save: "保存",
            deleteAddress: "删除",
            createWallet: "创建钱包",
            importWallet: "导入钱包",
            create: "创建",
            done: "完成",
            import: "导入",
            ok: "好的",
            openTip: "10月31号开启此功能",
        },

        navbar: {
            wallet: "钱包",
            dapp: "应用",
            my: "我的",
        },

        toast: {
            info: {
                quitApp: "再按一次退出应用!",
                createWallet: "请先创建钱包账户 !"
            },
            success: {
                add: "增加成功",
                copy: "拷贝成功",
                create: "创建钱包成功",
                export: "导出成功",
                save: "保存成功",
                import: "导入成功",
                send: "发送成功",
                clear: "清理成功"
            },
            loading: {
                creating: "创建中...",
                exporting: "导出中...",
                importing: "导入中...",
                sending: "发送中..."
            },
            error: {
                passwordVerify: "密码为8位以上字符长度!",
                passwordNotMatch: "两次密码输入的不一致!",
                incorrectOrder: "助记词的顺序不正确!",
                invalidAddress: "无效的收款地址!",
                accountExisted: "账户存在!",
                notEnough: "余额不足!",
                passwordError: "密码不正确!",
                notEnoughFee: "没有足够的SERO支付矿工费用",
            }

        },

        modal: {
            help: "帮助",
            sure: "确认删除吗???",
            mainPKr: "此收款地址可作为常用收款码，例如：挖矿地址。",
            pkr: "此收款地址不可做常用收款码，每次收款后将会刷新。",
            createWallet: "新建钱包",
            importWallet: "导入钱包",
            clearData:"清除应用数据",
            confirmClear:"请确认你已经备份好账户。清除后将重新同步交易数据",
            clearTip:"点击“确认”开始同步数据，过程中可能会出现白屏，请耐心等待数据同步完成，不要轻易结束进程。"
        },

        page: {
            wallet: {
                mainPKr: "主收款码",
                PKr: "收款码",
                Assets: "资产",
                selectWallet: "选择钱包",
            },

            txList: {
                all: "全部",
                out: "转出",
                in: "转入",
                noData: "暂时数据",
            },

            txDetail: {
                title: "交易详情",
                pending: "处理中",
                success: "交易成功",
                amount: "金额",
                fee: "费用",
                from: "发送",
                to: "收款",
                hash: "交易哈希",
                block: "块号",
                goto: "到区块浏览器查看详情 >"
            },

            txTransfer: {
                balance: "余额",
                address: "收款地址",
                inputAmount: "请输入金额",
                inputAddress: "请输入地址",
                fee: "费用",
                total: "总计",
                amount: "金额",
                gas: "Gas",
                gasPrice: "Gas Price",
                inputPassword: "请输入密码",
                passwordMsg: "账户密码"
            },

            addressBook: {
                title: "地址簿",
                add: "添加地址簿",
                name: "钱包名称",
                address: "地址",
                description: "描述(可选)",
                detail: "地址详情",
            },

            walletManage: {
                mainPKr: "主收款码",
                PKr: "收款码",
                password: "请输入密码",
                passwordHint: "密码提示信息",
                export: "导出助记词",
                changePasswordHint: "修改密码提示信息",
                changeProfilePhoto: "修改头像",
                changeWalletName: "修改钱包名称",
            },

            setting: {
                language: "语言",
                unit: "币种单位",
                node: "节点设置",
                pkr: "查看同步状态"
            },

            create: {
                import: "导入",
                step1: {
                    title: "创建钱包",
                    walletName: "钱包名称",
                    password: "密码",
                    rePassword: "重复输入密码",
                    hint: "密码提示信息(可选)",
                    passwordTips: "不少于8位字符，建议混合大小字母、数字组合"
                },
                step2: {
                    title: "备份提示",
                    d1: "获得助记词等于拥有钱包资产所有权利",
                    d2: "备份助记词",
                    d3: "使用纸和笔正确抄写助记词，如果你的手机丢失、被盗、损坏、助记词将可以恢复你的资产",
                    d4: "离线保管",
                    d5: "妥善保管至隔离网络的安全地方，请勿将助记词在联网环境下分享和存储，比如：邮件、相册、社交应用等",
                    d6: "请勿截屏",
                    d7: "请勿截屏分享和存储，这将可能被第三方恶意软件收集，造成资产损失",
                },
                step3: {
                    title: "备份助记词",
                    d1: "请按顺序选择助记词，确保备份正确",
                },
                step4: {
                    title: "确认助记词",
                    d1: "请按顺序点击助记词，以确认您正确备份",
                },
            },
            import: {
                tips: "使用助记词导入的同时可以修改钱包密码。",
                inputTips: "输入助记词单词，并使用空格分隔",
                name: "钱包名称",
                password: "钱包密码",
                rePassword: "重复输入密码",
                hint: "密码提示信息",
            },
            my: {
                addressBook: "地址簿",
                walletManage: "钱包管理",
                settings: "使用设置  ",
                termOfUse: "用户协议",
                about: "关于我们",
                clear: "清除缓存",

                address: {
                    name: "钱包名称",
                    address: "地址",
                    description: "备注(可选)",
                    add: "增加地址",
                    edit: "编辑地址",
                    detail: "地址详情"
                },

                manage: {
                    mainPKr: "主收款码",
                    pkr: "收款码",
                    hint: "密码提示信息",
                    export: "导出助记词"
                },

            },

            dapp:{
                search:"输入DApp的地址",
                invalidDApp:"无效的DApp url",
                recent:"最近使用",
                recommended:"推荐",
            }

        }
    }
}

export default Language