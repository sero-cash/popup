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
            } else if (tLang === "ja_JP") {
                return this.ja_JP;
            } else if (tLang === "be_BY") {
                return this.be_BY;
            } else if (tLang === "ko_KR") {
                return this.ko_KR;
            } else {
                return this.en_US;
            }
        }
    }

    en_US = {
        key: "en_US",
        value: "English",
        button: {
            confirm: "Confirm",
            cancel: "Cancel",
            next: "Next",
            receive: "Receive",
            transfer: "Transfer",
            add: "Add",
            save: "Save",
            deleteAddress: "Delete",
            createWallet: "Create Wallet",
            importWallet: "Import Wallet",
            create: "Create",
            done: "Done",
            import: "Import",
            ok: "OK",
            openTip: "Open on October 31",
            update: "Update",
            repair: "Repair data",
            share: "Share",
            copyLink: "Copy Link",
            refresh: "Refresh",
        },

        navbar: {
            wallet: "Wallet",
            dapp: "DApp",
            my: "My",
        },

        toast: {
            info: {
                quitApp: "Press again to exit App !",
                isLatest: "You are the latest version!",
                createWallet: "Please create wallet first !",
                removeAccount: "Warning: If you do not back up properly, you will not be able to retrieve your wallet after deleting it. Please handle this operation carefully"
            },
            success: {
                add: "Add Successfully",
                copy: "Copy Successfully",
                create: "Create Wallet Successfully",
                export: "Export Successfully",
                save: "Save Successfully",
                import: "Import Successfully",
                send: "Send Successfully",
                clear: "Clear Successfully",
                operation: "Operation Successfully"
            },
            loading: {
                creating: "Creating...",
                exporting: "Exporting...",
                importing: "Importing...",
                sending: "Sending...",
                deleting: "Deleting...",
                synchronizing: "Synchronizing...",
                synccompleted:"Sync completed!"
            },
            error: {
                passwordVerify: "Password at least 8 characters!",
                passwordNotMatch: "Password do not match!",
                incorrectOrder: "Incorrect order of Mnemonic Phrase!",
                invalidAddress: "Invalid Address!",
                accountExisted: "The account has existed!",
                notEnough: "The balance is not enough!",
                passwordError: "Password is incorrect!",
                notEnoughFee: "Not enough SERO to pay gas fee !",
                invalidMnemonic: "Invalid Mnemonic!",
                clearData:"Cleanup failed, please try again later!",
            }
        },

        modal: {
            help: "Help",
            sure: "Are you sure???",
            mainPKr: "This is a collection address that can be used for frequent collections such as mining.",
            pkr: "The collection address will change after each successful transaction.",
            createWallet: "Create Wallet",
            importWallet: "Import Wallet",
            clearData: "Clear app data",
            confirmClear: "Please confirm that you have backed up your account. Cleared will resynchronize transaction data",
            clearTip: 'Click "Confirm" to start syncing data. There may be a white screen during the process. Please wait patiently for data synchronization to complete, do not end the process easily.',
            blockHeight:'For asset security, 12 blocks behind the main chain',

            dappTip1: "You are visiting a third-party DApp",

            dappTip2: "You are about to visit an application developed by a third party . Please read carefully [",
            dappTip3: "Potential risks of DApp and SERO Foundation's Disclaimers",
            dappTip4: "]",
            haveRead: "I have read it ",
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
                passwordMsg: "Your account password",
                failed: "Transfer failed, please keep synchronized to the latest block!",
                thirdpay:"This payment is initiated by a third party. If you have any questions, please contact the third party."
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
                pkr: "Check synchronization status",
                source:"Select Wallet Source",
                cnNode: "Node 2 (Mainland China)",
                enNode: "Node 1 (Global)"
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
                    skip:"Already backed up? Skip this step",
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
                help: "FAQ",
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
            dapp: {
                search: "Enter DApp url",
                invalidDApp: "Invalid DApp url",
                recent: "Recent",
                popup: "Recommended",
                recommended: "Community voted DApps",
            }

        }
    };

    zh_CN = {
        key: "zh_CN",
        value: "简体中文",
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
            update: "立即更新",
            repair: "修复数据",
            share: "分享",
            copyLink: "复制链接",
            refresh: "刷新",
        },

        navbar: {
            wallet: "钱包",
            dapp: "应用",
            my: "我的",
        },

        toast: {
            info: {
                quitApp: "再按一次退出应用!",
                isLatest: "已经是最新版本!",
                createWallet: "请先创建钱包账户 !",
                removeAccount: "警告：若无妥善备份，删除钱包后将无法找回钱包，请慎重处理该操作"
            },
            success: {
                add: "增加成功",
                copy: "拷贝成功",
                create: "创建钱包成功",
                export: "导出成功",
                save: "保存成功",
                import: "导入成功",
                send: "发送成功",
                clear: "清理成功",
                operation: "操作成功"
            },
            loading: {
                creating: "创建中...",
                exporting: "导出中...",
                importing: "导入中...",
                sending: "发送中...",
                deleting: "删除中...",
                synchronizing: "正在同步...",
                synccompleted:"同步完成!"
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
                invalidMnemonic: "无效的助记词!",
                clearData:"正在同步区块，清除失败，请稍后再试!",
            }

        },

        modal: {
            help: "帮助",
            sure: "确认删除吗???",
            mainPKr: "此收款地址可作为常用收款码，例如：挖矿地址。",
            pkr: "此收款地址不可做常用收款码，每次收款后将会刷新。",
            createWallet: "新建钱包",
            importWallet: "导入钱包",
            clearData: "清除应用数据",
            confirmClear: "请确认你已经备份好账户。清除后将重新同步交易数据",
            clearTip: "点击“确认”后，将会重新同步数据，同步过程中保持钱包在手机前端运行，直到等待数据同步完成。",
            blockHeight:'为了资产的安全性，钱包同步的区块比主链落后了12个区块',
            dappTip1:"你正在访问第三方DApp",
            dappTip2:"你将要访问的应用程序完全由第三方开发，请认真阅读【",
            dappTip3:"去中心化应用的可能风险以及SERO基金会的免责条款",
            dappTip4:"】",
            haveRead: "已经阅读 ",

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
                noData: "暂无数据",
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
                passwordMsg: "账户密码",
                failed: "交易发送失败，请保持同步到最新区块!",
                thirdpay:"本次支付由第三方发起，如有疑问请第三方。"
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
                pkr: "同步状态",
                source:"设置钱包开源社区",
                cnNode:"节点2(中国大陆)",
                enNode:"节点1(全球)"
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
                    skip:"已备份? 跳过此步骤",
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
                settings: "使用设置",
                termOfUse: "用户协议",
                about: "关于我们",
                help: "使用帮助",
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

            dapp: {
                search: "输入DApp的地址",
                invalidDApp: "无效的DApp url",
                recent: "最近使用",
                popup:"推荐",
                recommended: "社区投票的DApps",
            }

        }
    };

    ja_JP = {
        key: "ja_JP",
        value: "日本語",
        button: {
            confirm: "確認する",
            cancel: "キャンセル",
            next: "次",
            receive: "受け取る",
            transfer: "転送",
            add: "加える",
            save: "セーブ",
            deleteAddress: "削除",
            createWallet: "ウォレットを作成",
            importWallet: "ウォレットをインポート",
            create: "ート",
            done: "完了",
            import: "完了",
            ok: "OK",
            openTip: "10月31日にオープン",
            update: "今すぐ更新",
            repair: "修理データ",
            share: "共有",
            copyLink: "リンクをコピー",
            refresh: "更新",
        },

        navbar: {
            wallet: "財布",
            dapp: "DApp",
            my: "僕の",
        },

        toast: {
            info: {
                quitApp: "もう一度押すとアプリが終了します！",
                isLatest: "すでに最新バージョンです!",
                createWallet: "最初にウォレットを作成してください!",
                removeAccount: "警告：適切にバックアップしないと、ウォレットを削除した後、ウォレットを取得できません。この操作は慎重に処理してください。"
            },
            success: {
                add: "正常に追加されました",
                copy: "正常にコピーされました",
                create: "ウォレットを作成しました 首尾よく",
                export: "正常にエクスポートされました",
                save: "正常に保存",
                import: "正常にインポートされました",
                send: "正常に送信されました",
                clear: "正常にクリアされました",
                operation: "操作が成功しました"
            },
            loading: {
                creating: "作成...",
                exporting: "エクスポートしています...",
                importing: "インポートしています...",
                sending: "送信 ...",
                deleting: "削除中...",
                synchronizing: "同期中...",
                synccompleted: "同期が完了しました！"

            },
            error: {
                passwordVerify: "少なくとも8文字のパスワード！",
                passwordNotMatch: "パスワードが一致しません！",
                incorrectOrder: "ニーモニックフレーズの順序が正しくありません！",
                invalidAddress: "無効なアドレス！",
                accountExisted: "アカウントは既に存在します！",
                notEnough: "バランスが十分ではありません！",
                passwordError: "間違ったパスワード！",
                notEnoughFee: "料金を支払うのに十分なSEROがありません！",
                invalidMnemonic: "無効なニーモニック!",
                clearData:"クリーンアップに失敗しました。しばらくしてからもう一度お試しください!",
            }
        },

        modal: {
            help: "助けて",
            sure: "本気ですか？？？",
            mainPKr: "これは、マイニングなどの頻繁な収集に使用できる収集アドレスです。",
            pkr: "収集アドレスは、トランザクションが成功するたびに変更されます。",
            createWallet: "ウォレットを作成",
            importWallet: "ウォレットをインポート",
            clearData: "アプリデータを消去する",
            confirmClear: "アカウントをバックアップしたことを確認してください。トランザクションデータはクリア後に再同期されます",
            clearTip: '[確認]をクリックして、データの同期を開始します。プロセス中に白い画面が表示される場合があります。データの同期が完了するまでお待ちください。プロセスを突然終了しないでください。',
            blockHeight:'資産セキュリティのために、メインチェーンの背後に12ブロック',
            dappTip1: "サードパーティのDAppにアクセスしています",

            dappTip2: "サードパーティが開発したアプリケーションにアクセスしようとしています。よくお読みください[",
            dappTip3: "DAppとSERO Foundationの免責事項の潜在的なリスク",
            dappTip4: "]",
            haveRead: "読みましたhave",
        },

        page: {
            wallet: {
                mainPKr: "メインPKr",
                PKr: "PKr",
                Assets: "資産",
                selectWallet: "ウォレットを選択",
            },

            txList: {
                all: "すべて",
                out: "でる",
                in: "に",
                noData: "データなし",
            },

            txDetail: {
                title: "取引情報",
                success: "成功",
                pending: "ペンディング",
                amount: "量",
                fee: "料金",
                from: "から",
                to: "に",
                hash: "ハッシュ",
                block: "ブロック",
                goto: "詳細については、ブロックエクスプローラーに移動してください"
            },

            txTransfer: {
                balance: "バランス",
                address: "住所を",
                inputAmount: "入力量",
                inputAddress: "SEROアドレスを入力してください",
                fee: "料金",
                total: "合計",
                amount: "量",
                gas: "ガス",
                gasPrice: "ガス価格",
                inputPassword: "入力パスワード",
                passwordMsg: "アカウントのパスワード",
                failed: "トランザクションの送信に失敗しました。最新のブロックに同期してください!",
                thirdpay:"この支払いはサードパーティによって開始されます。疑問がある場合は、サードパーティにお問い合わせください。"
            },

            addressBook: {
                title: "住所録",
                add: "住所を追加",
                name: "名",
                address: "住所を",
                description: "説明（オプション）",
                detail: "住所の詳細",
            },

            walletManage: {
                mainPKr: "メインPKr",
                PKr: "PKr",
                passwordHint: "パスワードのヒント",
                export: "ニーモニックフレーズのエクスポート",
                password: "パスワードを入力してください",
                changePasswordHint: "パスワードのヒントを変更する",
                changeProfilePhoto: "プロフィール写真の変更",
                changeWalletName: "ウォレット名を変更",
            },

            setting: {
                language: "言語",
                unit: "通貨単位",
                node: "ノード設定",
                pkr: "PKrを確認する",
                source:"ウォレットをオープンソースに設定します",
                cnNode:"ノード2（中国本土）",
                enNode:"ノード1（グローバル）"
            },

            create: {
                import: "インポート",
                step1: {
                    title: "SEROウォレットを作成",
                    walletName: "ウォレット名",
                    password: "パスワード",
                    rePassword: "パスワードを再度入力してください",
                    hint: "パスワードヒント（オプション）",
                    passwordTips: "少なくとも8文字。大文字と小文字のアルファベット、数字、記号を混在させることをお勧めします"
                },
                step2: {
                    title: "バックアップのヒント",
                    d1: "ニーモニックを取得することは、すべての資産を所有することに等しい",
                    d2: "バックアップニーモニック",
                    d3: "ニーモニックを書き留めてください。スマートフォンが紛失、盗難、破損した場合、Mnemonicを使用して資産を回復できます",
                    d4: "オフラインストレージ",
                    d5: "インターネットから隔離された安全な場所に保存してください。メール、アルバム、ソーシャルアプリなどのネットワーク環境でニーモニックを共有または保存しないでください。",
                    d6: "スクリーンショットを撮らないでください",
                    d7: "スクリーンショットを共有または保存しないでください。サードパーティが収集したスクリーンショットは、資産の損失につながる可能性があります。",
                },
                step3: {
                    title: "バックアップニーモニックフレーズ",
                    d1: "ニーモニックフレーズを適切にメモし、安全にバックアップしてください",
                },
                step4: {
                    title: "確認する",
                    d1: "ニーモニックフレーズを正しい順序で選択してください",
                    skip:"バックアップ済みですか？このステップをスキップしてください",
                },
            },
            import: {
                tips: "ニーモニックフレーズのインポート中にパスワードをリセットできます",
                inputTips: "ニーモニックフレーズをスペースで区切って入力してください",
                name: "ウォレット名",
                password: "ウォレットパスワード",
                rePassword: "パスワードを再度入力してください",
                hint: "パスワードのヒント",
            },
            my: {
                addressBook: "住所録",
                walletManage: "ウォレット管理",
                settings: "設定",
                termOfUse: "利用規約",
                about: "私たちに関しては",
                help: "よくある質問",
                clear: "アプリのデータを消去",

                address: {
                    name: "名",
                    address: "住所を",
                    description: "説明（オプション）",
                    add: "住所を追加",
                    edit: "住所を編集",
                    detail: "住所の詳細"
                },
                manage: {
                    mainPKr: "メインPKr",
                    pkr: "PKr",
                    hint: "パスワードのヒント",
                    export: "ニーモニックフレーズのエクスポート"
                },

            },
            dapp: {
                search: "DApp URLを入力してください",
                invalidDApp: "無効なDApp URL",
                recent: "最近",
                popup:"お勧め",
                recommended: "コミュニティがDAppsに投票しました",
            }

        }
    };

    be_BY = {
        key: "be_BY",
        value: "русский",

        button: {
            confirm: "Подтвердите",
            cancel: "Отмена",
            next: "следующ",
            receive: "Получать",
            transfer: "перечислить",
            add: "Добавлять",
            save: "Сохранить",
            deleteAddress: "Удалить",
            createWallet: "Создать кошелек",
            importWallet: "Импортный кошелек",
            create: "Создайте",
            done: "Выполнено",
            import: "импорт",
            ok: "OK",
            openTip: "Открыт 31 октября",
            update: "обновление",
            repair: "Рамонт дадзеных",
            share: "Падзяліцца",
            copyLink: "Скапіяваць спасылку",
            refresh: "Абнавіць",
        },

        navbar: {
            wallet: "бумажник",
            dapp: "DApp",
            my: "Мой",
        },

        toast: {
            info: {
                quitApp: "Нажмите еще раз, чтобы выйти из приложения!",
                isLatest: "Уже последняя версия!",
                createWallet: "Пожалуйста, сначала создайте кошелек!",
                removeAccount:"Предупреждение: если вы не сделаете резервную копию должным образом, вы не сможете получить свой кошелек после удаления. Пожалуйста, выполняйте эту операцию осторожно"
            },
            success: {
                add: "Добавлено Успешно",
                copy: "Успешно Скопировано",
                create: "Успешно Создан Кошелек",
                export: "Успешно Экспортировано",
                save: "Сохранено Успешно",
                import: "Импортировано Успешно",
                send: "Отправлено Успешно",
                clear: "Успешно очищено",
                operation: "Операция прошла успешно"
            },
            loading: {
                creating: "Творя...",
                exporting: "Экспорт...",
                importing: "Импортирующий...",
                sending: "Посылка ...",
                deleting: "Сінхранізацыя...",
                synchronizing: "Сінхранізацыя...",
                synccompleted:"Сінхранізацыя завершана!"
            },
            error: {
                passwordVerify: "Пароль должен содержать не менее 8 символов!",
                passwordNotMatch: "Пароли не соответствуют!",
                incorrectOrder: "Неверный порядок мнемонической фразы!",
                invalidAddress: "Неверный адрес!",
                accountExisted: "Аккаунт уже существует!",
                notEnough: "Баланса недостаточно!",
                passwordError: "Неверный пароль!",
                notEnoughFee: "Недостаточно SERO для оплаты платы за газ!",
                invalidMnemonic: "Няправільны мнеманічны характар !",
                clearData:"Уборка не атрымалася. Паспрабуйце яшчэ раз пазней!",
            }
        },

        modal: {
            help: "Помогите",
            sure: "Вы уверены???",
            mainPKr: "Это адрес коллекции, который можно использовать для частых коллекций, таких как майнинг.",
            pkr: "Адрес коллекции будет меняться после каждой успешной транзакции.",
            createWallet: "Создать кошелек",
            importWallet: "Импортный кошелек",
            clearData: "Очистить данные приложения",
            confirmClear: "Пожалуйста, подтвердите, что вы создали резервную копию своей учетной записи. Очистка данных приложения приведет к повторной синхронизации данных транзакции",
            clearTip: 'Нажмите «Подтвердить», чтобы начать синхронизацию данных. Во время процесса может быть белый экран. Пожалуйста, терпеливо дождитесь завершения синхронизации данных, не прерывайте процесс внезапно.',
            blockHeight:'Вы собираетесь получить доступ к стороннему DApp',
            dappTip1: "Вы атрымліваеце доступ да старонняга DApp",

            dappTip2: "Вы збіраецеся наведаць прыкладанне, распрацаванае трэцім бокам. Калі ласка, уважліва прачытайце [",
            dappTip3: "патэнцыйныя рызыкі адмовы ад фонду DApp і фонду SERO",
            dappTip4: "]",
            haveRead: "Я прачытаў",
        },

        page: {
            wallet: {
                mainPKr: "mainPKr",
                PKr: "PKr",
                Assets: "активы",
                selectWallet: "Выберите кошелек",
            },

            txList: {
                all: "весь",
                out: "наружу",
                in: "в",
                noData: "Никакие данные",
            },

            txDetail: {
                title: "Информация о транзакции",
                success: "успех",
                pending: "В ожидании",
                amount: "сумма",
                fee: "сборы",
                from: "от",
                to: "к",
                hash: "Хэш",
                block: "блок",
                goto: "Для получения более подробной информации перейдите в обозреватель блоков >"
            },

            txTransfer: {
                balance: "Остаток средств",
                address: "Адрес",
                inputAmount: "Сумма ввода",
                inputAddress: "Пожалуйста, введите адрес SERO",
                fee: "сборы",
                total: "весь",
                amount: "сумма",
                gas: "газ",
                gasPrice: "Цена на газ",
                inputPassword: "Введите пароль",
                passwordMsg: "Пароль от вашей учетной записи",
                failed: "Не атрымалася адправіць транзакцыю. Працягвайце сінхранізаваць апошні блок!",
                thirdpay:"Гэты плацеж ініцыяваны трэцім бокам, калі вы сумняваецеся, калі ласка, трэцім бокам."

            },

            addressBook: {
                title: "адресная книга",
                add: "Добавить адрес",
                name: "имя",
                address: "Адрес",
                description: "Описание (необязательно)",
                detail: "Деталь адреса",
            },

            walletManage: {
                mainPKr: "MainPKr",
                PKr: "PKr",
                passwordHint: "Подсказка пароля",
                export: "Экспортировать мнемоническую фразу",
                password: "Введите пароль",
                changePasswordHint: "Сменить пароль Подсказка",
                changeProfilePhoto: "Изменить фотографию профиля",
                changeWalletName: "Изменить имя кошелька",
            },

            setting: {
                language: "язык",
                unit: "Валютная единица",
                node: "Настройки узла",
                pkr: "Проверьте PKr",
                source:"Выберите источник кошелька",
                cnNode:"Вузел 2 (Кітай)",
                enNode:"Вузел 1 (глабальны)"

            },

            create: {
                import: "импорт",
                step1: {
                    title: "Создать SERO Кошелек",
                    walletName: "Название кошелька",
                    password: "пароль",
                    rePassword: "Повторите пароль",
                    hint: "Подсказка к паролю (необязательно)",
                    passwordTips: "Не менее 8 символов, рекомендуется смешивать прописные и строчные буквы, цифры и символы."
                },
                step2: {
                    title: "Резервное копирование Советы",
                    d1: "Владение мнемоникой аналогично владению всеми активами",
                    d2: "Резервное Копирование Мнемоника",
                    d3: "Пожалуйста, запишите мнемонику. Если ваш телефон потерян, украден, поврежден, Mnemonic будет использоваться для восстановления ваших активов",
                    d4: "Offline storage",
                    d5: "Пожалуйста, сохраните его в безопасном месте, изолированном от Интернета. Пожалуйста, не передавайте и не храните Mnemonic в сетевой среде, такой как электронная почта, альбомы, приложения для социальных сетей и т. Д.",
                    d6: "Не снимайте скриншот.",
                    d7: "Пожалуйста, не делитесь и не храните скриншоты, которые могут быть получены третьими лицами, что может привести к потере активов.",
                },
                step3: {
                    title: "Резервное Копирование Мнемонической Фразы",
                    d1: "Пожалуйста, запишите фразу-мнемонику правильно и надежно сделайте резервную копию",
                },
                step4: {
                    title: "Подтвердите",
                    d1: "пожалуйста, выберите мнемоническую фразу в правильном порядке",
                    skip:"Уже создана резервная копия? Пропустить этот шаг",
                },
            },
            import: {
                tips: "Вы можете сбросить пароль при импорте мнемонической фразы",
                inputTips: "Введите мнемонические фразы, разделенные пробелами",
                name: "Название кошелька",
                password: "Пароль кошелька",
                rePassword: "Повторите пароль",
                hint: "Подсказка пароля",
            },
            my: {
                addressBook: "Адресная книга",
                walletManage: "Управление кошельком",
                settings: "настройки",
                termOfUse: "Условия пользования",
                about: "О нас",
                help: "FAQ",
                clear: "Очистить данные приложения",

                address: {
                    name: "имя",
                    address: "Адрес",
                    description: "Описание (необязательно)",
                    add: "Добавить адрес",
                    edit: "Редактировать Адрес",
                    detail: "Адрес подробно"
                },
                manage: {
                    mainPKr: "MainPKr",
                    pkr: "PKr",
                    hint: "Подсказка пароля",
                    export: "Экспортировать мнемоническую фразу"
                },

            },
            dapp: {
                search: "Введите DApp URL",
                invalidDApp: "Неверный DApp URL",
                recent: "Недавний",
                popup:"рекомендуемые",
                recommended: "Даччыны DAppsСуполка прагаласавала за Допса",
            }
        }
    };

    ko_KR = {

        key: "ko_KR",
        value: "언어",

        button: {
            confirm: "확인",
            cancel: "취소",
            next: "다음 것",
            receive: "받다",
            transfer: "보내기",
            add: "더하다",
            save: "구하다",
            deleteAddress: "삭제",
            createWallet: "월렛 만들기",
            importWallet: "수입 지갑",
            create: "창조하다",
            done: "끝난",
            import: "가져오기",
            ok: "OK",
            openTip: "10 월 31 일 오픈",
            update: "업데이트",
            repair: "수리 데이터",
            share: "공유",
            copyLink: "링크 복사",
            refresh: "새로 고침",
        },

        navbar: {
            wallet: "지갑",
            dapp: "DApp",
            my: "내",
        },

        toast: {
            info: {
                quitApp: "다시 누르면 앱이 종료됩니다!",
                isLatest: "이미 최신 버전입니다!",
                createWallet: "먼저 지갑을 만드십시오!",
                removeAccount:"경고 : 제대로 백업하지 않으면 지갑을 삭제 한 후 지갑을 검색 할 수 없으므로이 작업을주의해서 처리하십시오."
            },
            success: {
                add: "성공적으로 추가되었습니다",
                copy: "성공적으로 복사",
                create: "월렛이 성공적으로 생성되었습니다",
                export: "성공적으로 수출",
                save: "성공적으로 저장 되었음",
                import: "성공적으로 가져오기",
                send: "성공적으로 보냄",
                clear: "성공적으로 클리어",
                operation: "작업 성공"
            },
            loading: {
                creating: "만드는 중 ...",
                exporting: "내보내는 중 ...",
                importing: "가져 오기 ...",
                sending: "보내기...",
                deleting: "삭제...",
                synchronizing:"동기화",
                synccompleted: "동기화 완료!"
            },
            error: {
                passwordVerify: "비밀번호 최소 8 글자!",
                passwordNotMatch: "비밀번호가 일치하지 않습니다!",
                incorrectOrder: "니모닉의 잘못된 순서!",
                invalidAddress: "잘못된 주소!",
                accountExisted: "계정이 이미 존재합니다!",
                notEnough: "균형이 충분하지 않습니다!",
                passwordError: "비밀번호가 맞지 않습니다!",
                notEnoughFee: "SERO는 가스를 지불하기에 충분하지 않습니다수수료!",
                invalidMnemonic: "잘못된 니모닉 !",
                clearData:"정리에 실패했습니다. 나중에 다시 시도하십시오!",
            }
        },

        modal: {
            help: "도움",
            sure: "확실합니까???",
            mainPKr: "채굴과 같이 자주 수집하는 데 사용할 수있는 수집 주소입니다.",
            pkr: "수집 주소는 각 성공적인 거래 후 변경됩니다.",
            createWallet: "월렛 만들기",
            importWallet: "가져오기 지갑",
            clearData:"명확한 앱 데이터",
            confirmClear:"계정을 백업했는지 확인하십시오. 앱 데이터를 지운 후 트랜잭션 데이터가 다시 동기화됩니다.",
            clearTip:'"확인"을 클릭하여 데이터 동기화를 시작하십시오. 처리하는 동안 흰색 화면이 표시 될 수 있습니다. 데이터 동기화가 완료 될 때까지 기다리십시오. 프로세스를 갑자기 종료하지 마십시오.',
            blockHeight:'자산 보안을 위해 메인 체인 뒤 12 블록',
            dappTip1 : "타사 DApp에 액세스하고 있습니다",

            dappTip2 : "타사에서 개발 한 응용 프로그램을 방문하려고합니다. 을 (를)주의 깊게 읽으십시오[",
            dappTip3 : "DApp 및 SERO Foundation의 고지 사항의 잠재적 위험",
            dappTip4 : "]",
            haveRead : "읽었습니다.",
        },

        page: {
            wallet: {
                mainPKr: "mainPKr",
                PKr: "PKr",
                Assets: "자산",
                selectWallet: "지갑 선택",
            },

            txList: {
                all: "모든",
                out: "아웃",
                in: "에서",
                noData: "데이터가 없습니다",
            },

            txDetail: {
                title: "거래 정보",
                success: "성공",
                pending: "보류 중",
                amount: "양",
                fee: "수수료",
                from: "부터",
                to: "으로",
                hash: "해시",
                block: "블록",
                goto: "자세한 내용은 블록 탐색기로 이동하십시오.>"
            },

            txTransfer: {
                balance: "균형",
                address: "주소",
                inputAmount: "입력 금액",
                inputAddress: "SERO 주소를 입력하십시오",
                fee: "수수료",
                total: "합계",
                amount: "양",
                gas: "가스",
                gasPrice: "가스 가격",
                inputPassword: "입력 비밀번호",
                passwordMsg: "계정 비밀번호",
                failed: "거래 전송 실패, 최신 블록과 동기화 상태를 유지하십시오!",
                thirdpay:"이 지불은 제 3자가 시작합니다. 확실하지 않은 경우 제 3자를 참조하십시오."
            },

            addressBook: {
                title: "주소록",
                add: "주소 추가",
                name: "이름",
                address: "주소",
                description: "설명 (선택 사항)",
                detail: "주소 세부 사항",
            },

            walletManage: {
                mainPKr: "MainPKr",
                PKr: "PKr",
                passwordHint: "암호 힌트",
                export: "니모닉 문구 내보내기",
                password: "비밀번호 입력",
                changePasswordHint: "비밀번호힌트변경",
                changeProfilePhoto: "프로필 사진 변경",
                changeWalletName: "월렛 이름 변경",
            },

            setting: {
                language: "언어",
                unit: "통화 단위",
                node: "노드 설정",
                pkr: "PKr 확인",
                source:"월렛 오픈 소스 커뮤니티 설정",
                cnNode:"노드 2 (중국 본토)",
                enNode:"노드 1 (글로벌)"
            },

            create: {
                import: "가져오기",
                step1: {
                    title: "SERO Wallet 생성",
                    walletName: "지갑 이름",
                    password: "암호",
                    rePassword: "암호 반복",
                    hint: "암호 힌트(선택 사항)",
                    passwordTips: "최소 8 자, 대문자와 소문자 알파벳, 숫자 및 기호를 혼합하는 것이 좋습니다."
                },
                step2: {
                    title: "백업 팁",
                    d1: "니모닉을 소유하는 것은 모든 자산을 소유하는 것과 유사합니다",
                    d2: "백업 니모닉",
                    d3: "니모닉 문구를 적어 둡니다. 니모닉은 휴대 전화를 분실, 도난 당하거나 손상된 경우 자산을 복구 할 수 있습니다.",
                    d4: "오프라인 저장소",
                    d5: "인터넷과 격리 된 안전한 장소에 보관하십시오. 이메일, 앨범, 소셜 앱 등과 같은 네트워크 환경에서 Mnemonic을 공유하거나 저장하지 마십시오.",
                    d6: "Do not take screenshot .",
                    d7: "스크린 샷을 공유하거나 저장하지 마십시오. 타사에서 수집 한 스크린 샷은 자산 손실로 이어질 수 있습니다.",
                },
                step3: {
                    title: "니모닉 문구 백업",
                    d1: "제대로 니모닉 텍스트를주의하고 안전하게 백업",
                },
                step4: {
                    title: "확인",
                    d1: "올바른 순서로 니모닉 구문을 선택하십시오",
                    skip:"이미 백업 되었습니까? 이 단계를 건너 뛰십시오",
                },
            },
            import: {
                tips: "가져 오는 동안 비밀번호를 재설정 할 수 있습니다 니모닉 문구.",
                inputTips: "공백으로 구분 된 니모닉 문구를 입력하십시오.",
                name: "지갑 이름",
                password: "월렛 비밀번호",
                rePassword: "암호 반복",
                hint: "암호 힌트",
            },
            my: {
                addressBook: "주소록",
                walletManage: "월렛 관리",
                settings: "설정",
                termOfUse: "서비스 약관",
                about: "우리에 대해",
                help: "자주하는 질문",
                clear: "명확한 앱 데이터",
                address: {
                    name: "이름",
                    address: "주소",
                    description: "설명 (선택 사항)",
                    add: "주소 추가",
                    edit: "주소 편집",
                    detail: "주소 세부 사항"
                },
                manage: {
                    mainPKr: "MainPKr",
                    pkr: "PKr",
                    hint: "암호 힌트",
                    export: "니모닉 문구 내보내기"
                },

            },
            dapp:{
                search:"DApp URL 입력",
                invalidDApp:"잘못된 DApp URL",
                recent:"충적세",
                popup:"제안 됨",
                recommended: "커뮤니티 투표 DApps",
            }
        }
    };

}

export default Language