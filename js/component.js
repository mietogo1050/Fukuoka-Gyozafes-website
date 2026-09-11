// ヘッダー用のコンポーネント
Vue.component('header-component', {
    props:{
        isNavOpen:Boolean,
    },
    template:`
    <header class="page-header" :class="{open:isNavOpen}">
            <a href="index.html"><img class="logo" src="img/logo.svg" alt="ふくおか餃子FES"></a>
            <nav>
                <ul class="main-nav">
                    <li><a href="index.html" @click="$emit('close-nav')">トップ</a></li>
                    <li><a href="index.html#access" @click="$emit('close-nav')">開催概要</a></li>
                    <li><a href="menu.html" @click="$emit('close-nav')">メニュー</a></li>
                    <li><a href="index.html#news" @click="$emit('close-nav')">お知らせ</a></li>
                    <li><a href="faq.html" @click="$emit('close-nav')">お問い合わせ</a></li>
                    <li><a href="index.html#ticket" class="ticket-btn" @click="$emit('close-nav')"><i class="fa-solid fa-ticket-simple"></i>前売り券を購入する</a></li>
                </ul>
                <div class="nav-sns">
                <a href="#" aria-label="Instagram"><img src="img/icon_Instagram.png" alt="Instagram"></a>
                <a href="#" aria-label="X"><img src="img/icon_x.png" alt="X"></a>
            </div>
            </nav>
            <button type="button" class="nav-btn" id="nav-btn" @click="$emit('toggle-nav')">
                <span class="nav-btn-line">
                    <span class="visually-hidden">メニュー開閉</span>
                </span>
            </button>
        </header>
    `,
});

// フッター用のコンポーネント
Vue.component('footer-component', {
    template:`
    <footer>
        <div class="footer-content">
            <div class="footer-sns">
                <a href="#" aria-label="Instagram"><img src="img/icon_Instagram.png" alt="Instagram"></a>
                <a href="#" aria-label="X"><img src="img/icon_x.png" alt="X"></a>
            </div>
            <div class="footer-text">
                <p>連絡先：ふくおか餃子FES実行委員会</p>
                <p>協賛：株式会社KWMC、九州餃子部、リカレントスクール餃子倶楽部</p>
            </div>
            <small>&copy;2030 ふくおか餃子FES実行委員会</small>
        </div>
    </footer>
    `,
});

// ==========================================
// 1. アコーディオンコンポーネントの登録
// ==========================================
    Vue.component('accordion-component', {
    props: {
        faqList: {
        type: Array,
        required: true
        }
    },
    template: `
        <div class="accordion">
        <div v-for="category in faqList" :key="category.categoryName" class="accordion-block" style="margin-bottom: 40px;">
            <div>
            <h3 class="faq-category">{{ category.categoryName }}</h3>
            </div>
            
            <div v-for="item in category.items" :key="item.id" class="accordion-item-box" style="margin-bottom: 15px;">
            <div class="question-box" @click="toggleItem(item)" :class="{ 'is-open': item.isOpen }" style="cursor: pointer;">
                <div class="flex-box">
                <h4 class="question-icon">Q.</h4>
                <p class="question-font">{{ item.question }}</p>
                </div>
                <div class="toggle-icon"><span></span></div>
            </div>
            <transition name="fade-slide">
            <div class="answer-box" v-show="item.isOpen">
                <p v-for="(line, index) in item.answer" :key="index" class="answer-font">
                {{ line }}
                </p>
            </div>
            </transition>
            </div>
        </div>
        </div>
    `,
    methods: {
        toggleItem: function(item) {
        item.isOpen = !item.isOpen;
        }
    }
    });


new Vue({
    el: '#app',
    data: {
        // ヘッダー・FAQ用データ
        isNavOpen: false,
        isModalOpen: false,
        faqData: [
            {
                categoryName: '来場について',
                items: [
                    {
                        id: 'q-1',
                        question: '雨天の場合も開催されますか？',
                        answer: [
                            '雨天決行ですが、荒天の場合は安全を考慮し中止となる場合があります。',
                            '最新情報はSNSでお知らせします。'
                        ],
                        isOpen: false
                    }
                ]
            },
            {
                categoryName: '会場について',
                items: [
                    {
                        id: 'q-2',
                        question: '喫煙所はありますか？',
                        answer: [
                            '会場内は全面禁煙ですが、敷地外に指定の喫煙エリアを設けています。',
                            'スタッフの案内に従ってご利用ください。'
                        ],
                        isOpen: false
                    },
                    {
                        id: 'q-3',
                        question: '授乳室やおむつ替えスペースはありますか？',
                        answer: [
                            'はい、メインゲート付近に授乳室とおむつ替え台を設置しています。',
                            '小さなお子様連れでも安心してご利用いただけます。'
                        ],
                        isOpen: false
                    },
                    {
                        id: 'q-4',
                        question: '駐車場はありますか？',
                        answer: [
                            '専用駐車場はございません。公共交通機関のご利用をおすすめします。'
                        ],
                        isOpen: false
                    },
                    {
                        id: 'q-5',
                        question: 'ペットを連れて入場できますか？',
                        answer: [
                            '混雑が予想されるため、ペットの同伴はご遠慮ください。',
                            'ただし補助犬は入場可能です。'
                        ],
                        isOpen: false
                    }
                ]
            },
            {
                categoryName: 'その他',
                items: [
                    {
                        id: 'q-6',
                        question: 'トイレはどこにありますか？',
                        answer: [
                            '会場内に複数の仮設トイレを設置しています。',
                            'マップの「トイレ」アイコンをご確認ください。'
                        ],
                        isOpen: false
                    },
                    {
                        id: 'q-7',
                        question: 'SNSで写真を投稿しても良いですか？',
                        answer: [
                            'はい、大歓迎です！',
                            '公式ハッシュタグ「#ふくおか餃子FES」をつけて投稿してください。'
                        ],
                        isOpen: false
                    },
                    {
                        id: 'q-8',
                        question: '問い合わせ先を教えてください。',
                        answer: [
                        '本ページのお問い合わせフォームまたは事務局メール宛にご連絡ください。'
                        ],
                        isOpen: false
                    }
                ]
            }
        ],

        // お問い合わせフォーム用データ
        userName: '',
        email: '',
        tel: '',
        category: '',
        message: '',
        agreed: false,
        nameError: '',
        emailError: '',
        categoryError: '',
        messageError: '',
        agreedError: '',
        menuList: menuList,
        selectedMenu: {},
        // menuList:window.menuList
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
            if (this.isNavOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        },
        closeNav() {
            this.isNavOpen = false;
            document.body.style.overflow = '';
        },
        validateName() {
            let name = this.userName.trim();
            if (name === '') {
                this.nameError = 'お名前を入力してください。';
                return;
            }
            if (name.length < 2) {
                this.nameError = 'お名前は2文字以上で入力してください。';
                return;
            }
            this.nameError = '';
        },
        validateEmail() {
            let email = this.email.trim();
            if (email === '') {
                this.emailError = 'メールアドレスを入力してください。';
                return;
            }
            if (!email.includes('@')) {
                this.emailError = 'メールアドレスの形式が正しくありません。';
                return;
            }
            const parts = email.split('@');
            if (parts.length !== 2 || parts[0] === '' || !parts[1].includes('.')) {
                this.emailError = 'メールアドレスの形式が正しくありません。';
                return;
            }
            this.emailError = '';
        },
        validateCategory() {
            if (this.category === '') {
                this.categoryError = 'お問い合わせ種別を選択してください。';
                return;
            }
            this.categoryError = '';
        },
        validateMessage() {
            let message = this.message.trim();
            if (message === '') {
                this.messageError = 'お問い合わせ内容を入力してください。';
                return;
            }
            this.messageError = '';
        },
        validateAgreed() {
            if (!this.agreed) {
                this.agreedError = '個人情報の取り扱いに同意してください。';
                return;
            }
            this.agreedError = '';
        },
        toggleNav(){
            this.isNavOpen = !this.isNavOpen;
            if(this.isNavOpen){
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        },
        closeNav() {
            this.isNavOpen = false;
            document.body.style.overflow = '';
        },

        
        showModal: function(menu) {
            this.selectedMenu = menu;
            this.isModalOpen = true;
        },
        closeModal: function() {
            this.isModalOpen = false;
        }
    },
    
    computed: {
        canSubmit() {
            const requiredFilled =
                this.userName.trim() !== '' &&
                this.email.trim() !== '' &&
                this.category !== '' &&
                this.message.trim() !== '';
            const noErrors =
                !this.nameError &&
                !this.emailError &&
                !this.categoryError &&
                !this.messageError &&
                !this.agreedError;
            return requiredFilled && noErrors && this.agreed;
        }
    }
});