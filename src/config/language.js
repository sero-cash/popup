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
            clearData: "Clear app data",
            confirmClear: "Please confirm that you have backed up your account. Cleared will resynchronize transaction data",
            clearTip: 'Click "Confirm" to start syncing data. There may be a white screen during the process. Please wait patiently for data synchronization to complete, do not end the process easily.',
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
            dapp: {
                search: "Enter DApp url",
                invalidDApp: "Invalid DApp url",
                recent: "Recent",
                recommended: "Recommended",
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
            clearData: "清除应用数据",
            confirmClear: "请确认你已经备份好账户。清除后将重新同步交易数据",
            clearTip: "点击“确认”开始同步数据，过程中可能会出现白屏，请耐心等待数据同步完成，不要轻易结束进程。",
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

            dapp: {
                search: "输入DApp的地址",
                invalidDApp: "无效的DApp url",
                recent: "最近使用",
                recommended: "推荐",
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
            deleteAddress: "住所を削除",
            createWallet: "ウォレットを作成",
            importWallet: "ウォレットをインポート",
            create: "ート",
            done: "完了",
            import: "完了",
            ok: "OK",
            openTip: "10月31日にオープン",
        },

        navbar: {
            wallet: "財布",
            dapp: "DApp",
            my: "僕の",
        },

        toast: {
            info: {
                quitApp: "もう一度押すとアプリが終了します！",
                createWallet: "最初にウォレットを作成してください!"
            },
            success: {
                add: "正常に追加されました",
                copy: "正常にコピーされました",
                create: "ウォレットを作成しました 首尾よく",
                export: "正常にエクスポートされました",
                save: "正常に保存",
                import: "正常にインポートされました",
                send: "正常に送信されました",
                clear: "正常にクリアされました"
            },
            loading: {
                creating: "作成...",
                exporting: "エクスポートしています...",
                importing: "インポートしています...",
                sending: "送信 ..."
            },
            error: {
                passwordVerify: "少なくとも8文字のパスワード！",
                passwordNotMatch: "パスワードが一致しません！",
                incorrectOrder: "ニーモニックフレーズの順序が正しくありません！",
                invalidAddress: "無効なアドレス！",
                accountExisted: "アカウントは既に存在します！",
                notEnough: "バランスが十分ではありません！",
                passwordError: "間違ったパスワード！",
                notEnoughFee: "料金を支払うのに十分なSEROがありません！"
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
            clearTip: '[確認]をクリックして、データの同期を開始します。プロセス中に白い画面が表示される場合があります。データの同期が完了するまでお待ちください。プロセスを突然終了しないでください。'
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
                passwordMsg: "アカウントのパスワード"
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
                pkr: "PKrを確認する"
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
                recommended: "お勧め",
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
            deleteAddress: "Удалить адрес",
            createWallet: "Создать кошелек",
            importWallet: "Импортный кошелек",
            create: "Создайте",
            done: "Выполнено",
            import: "импорт",
            ok: "OK",
            openTip: "Открыт 31 октября",
        },

        navbar: {
            wallet: "бумажник",
            dapp: "DApp",
            my: "Мой",
        },

        toast: {
            info: {
                quitApp: "Нажмите еще раз, чтобы выйти из приложения!",
                createWallet: "Пожалуйста, сначала создайте кошелек!"
            },
            success: {
                add: "Добавлено Успешно",
                copy: "Успешно Скопировано",
                create: "Успешно Создан Кошелек",
                export: "Успешно Экспортировано",
                save: "Сохранено Успешно",
                import: "Импортировано Успешно",
                send: "Отправлено Успешно",
                clear: "Успешно очищено"
            },
            loading: {
                creating: "Творя...",
                exporting: "Экспорт...",
                importing: "Импортирующий...",
                sending: "Посылка ..."
            },
            error: {
                passwordVerify: "Пароль должен содержать не менее 8 символов!",
                passwordNotMatch: "Пароли не соответствуют!",
                incorrectOrder: "Неверный порядок мнемонической фразы!",
                invalidAddress: "Неверный адрес!",
                accountExisted: "Аккаунт уже существует!",
                notEnough: "Баланса недостаточно!",
                passwordError: "Неверный пароль!",
                notEnoughFee: "Недостаточно SERO для оплаты платы за газ!"
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
            clearTip: 'Нажмите «Подтвердить», чтобы начать синхронизацию данных. Во время процесса может быть белый экран. Пожалуйста, терпеливо дождитесь завершения синхронизации данных, не прерывайте процесс внезапно.'
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
                passwordMsg: "Пароль от вашей учетной записи"
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
                pkr: "Проверьте PKr"
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
                recommended: "рекомендуемые",
            }
        }
    };
}

export default Language