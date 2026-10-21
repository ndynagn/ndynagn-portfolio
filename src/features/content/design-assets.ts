/** Resource inventory only; assets do not publish content records. */
export interface DesignAsset {
    readonly path: string;
    readonly bytes: number;
    readonly sha256: string;
}

export const designAssets: readonly DesignAsset[] = [
    {
        path: '/documents/gennady-nagibin-resume.pdf',
        bytes: 513887,
        sha256: 'b4171829bbfecdcc59f31c39e6ac862c2a2071564405ad0249d44c71433832c7',
    },
    {
        path: '/favicon.svg',
        bytes: 3235,
        sha256: '84856b1fa530b1ef445f1ea2c8eba3fe6518f6f90f8ef21f15177644ddeaeac5',
    },
    {
        path: '/fonts/OFL.txt',
        bytes: 4387,
        sha256: '58172e0c0fac2cda8a37b348164bb55e44b0e69051e557e92b1d3f6910141f7b',
    },
    {
        path: '/fonts/manrope-cyrillic.woff2',
        bytes: 14500,
        sha256: 'c268b459a9329e59fecf39a17618efd44c71735532048d60b12aab76a8c14914',
    },
    {
        path: '/fonts/manrope-latin.woff2',
        bytes: 24836,
        sha256: 'a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972',
    },
    {
        path: '/images/architecture.jpg',
        bytes: 141832,
        sha256: 'f92d4b82250c197cc94a3174ee2794dfa641c546942df96f7cb31396ff0eaabf',
    },
    {
        path: '/images/gennady-nagibin.jpeg',
        bytes: 219698,
        sha256: 'ab50680ea3a62e3601b1a9311bbb70762e906202963ad99b1ea02b48dfe6181c',
    },
    {
        path: '/images/projects/SOURCES.md',
        bytes: 2287,
        sha256: '55f8b1864627e5eb7b4eebfb7071544c1281cde8d13b017506c5e3c2bb5f024e',
    },
    {
        path: '/images/projects/aventin/screens-2-thumb.webp',
        bytes: 39170,
        sha256: 'bff4e0a43a71750551e051218fe3e690cb7661c82e026032e1db2e7f303e8d81',
    },
    {
        path: '/images/projects/aventin/screens-2.webp',
        bytes: 164416,
        sha256: '26e0fe7d20aeea57939e18916e3ba683035397d4a234a1e99a666178ce503790',
    },
    {
        path: '/images/projects/aventin/screens-3-thumb.webp',
        bytes: 62164,
        sha256: 'c9f4d54a7deb7fd83816e3dbd22c2f5354ca778689f2fa4df678eb5b6d212b0e',
    },
    {
        path: '/images/projects/aventin/screens-3.webp',
        bytes: 252634,
        sha256: 'ce824251ab870ce9ba8488c3d13d2004a01d70c9def0a8968842f65dfb5ce78a',
    },
    {
        path: '/images/projects/aventin/screens-4-thumb.webp',
        bytes: 23166,
        sha256: 'e08f185dd40dbe8ae071dd66bc5dfff90ca6e6c65a10f4e8faad31bfe44697b2',
    },
    {
        path: '/images/projects/aventin/screens-4.webp',
        bytes: 76894,
        sha256: 'f4e41c66ca16a940a1ce1fc00a735a0131370fdc0ef161807ec2345cea2b0b31',
    },
    {
        path: '/images/projects/aventin/screens-5-thumb.webp',
        bytes: 34802,
        sha256: '693d9ebd5f991d9652ccf339c14cf80772cbaf566ed51c2515f29c1136c99d12',
    },
    {
        path: '/images/projects/aventin/screens-5.webp',
        bytes: 154404,
        sha256: '35f04dcdf68597f491737f4a6d7a77758c85ec2abc2e2293452c08f70ea03547',
    },
    {
        path: '/images/projects/checkai/screens-1-thumb.webp',
        bytes: 30386,
        sha256: 'e02a6b2aae09c119bb6154bdd89ba0110cebc6d3a6ededc3070e2a634eeebe28',
    },
    {
        path: '/images/projects/checkai/screens-1.webp',
        bytes: 98680,
        sha256: 'fd6e086f56a0abf4c27780e68e502033a4c25d74ac371992ee63570099a4094c',
    },
    {
        path: '/images/projects/checkai/screens-2-thumb.webp',
        bytes: 26440,
        sha256: 'fff185df63446de02bb894a9ae9ff7a15c2e3942fa7dcfb86cf8d74caa0d3268',
    },
    {
        path: '/images/projects/checkai/screens-2.webp',
        bytes: 87218,
        sha256: '58859225532b6861030f346c4a8a980020ae953e350b88fe4c10b28e4e799c03',
    },
    {
        path: '/images/projects/checkai/screens-3-thumb.webp',
        bytes: 23376,
        sha256: '62748c31de2a921cc194fa62282b898c57932c8fe0dbdc761c7892428dd65766',
    },
    {
        path: '/images/projects/checkai/screens-3.webp',
        bytes: 76518,
        sha256: '59e2046c548ab285a34812fa8da890c8392081621b2894b17959af504649c424',
    },
    {
        path: '/images/projects/checkai/screens-4-thumb.webp',
        bytes: 22874,
        sha256: 'd49c270545a6c38db3efcd3fc42e45c63e526efe6e1e6dda518dc3a059160fdc',
    },
    {
        path: '/images/projects/checkai/screens-4.webp',
        bytes: 74566,
        sha256: '1685c08d5db29f96272dee9684ea7625efa593c16f450bee55f2612237e1d3d5',
    },
    {
        path: '/images/projects/checkai/screens-5-thumb.webp',
        bytes: 22274,
        sha256: '62d4c68f8902b9fca8e02e9fcf0c665af87610888cd6cdf1001a90c4e13b213d',
    },
    {
        path: '/images/projects/checkai/screens-5.webp',
        bytes: 69574,
        sha256: '4a39e574fca0415879d3ad9ed71df995a2ea519ae50d49eedc4a747518e94642',
    },
    {
        path: '/images/projects/galleria-minsk/screens-2-thumb.webp',
        bytes: 40724,
        sha256: '0d01d59ed730b85f52a10996b40a024a99ed70dba565167bd14a7f01b54b032e',
    },
    {
        path: '/images/projects/galleria-minsk/screens-2.webp',
        bytes: 150000,
        sha256: '4eb1037e47129296f6b1a8a636ea5cf10452361d4f1bf174fd5a587288659532',
    },
    {
        path: '/images/projects/galleria-minsk/screens-3-thumb.webp',
        bytes: 34786,
        sha256: '4604058062a56121fadc3e38ee19ed6f67b7479d593a54fd449f6dad96d99451',
    },
    {
        path: '/images/projects/galleria-minsk/screens-3.webp',
        bytes: 123500,
        sha256: '9ed3ecff732e39f29b5ef1b74ac34429d122b2e77d0452fda7981979a5e766f6',
    },
    {
        path: '/images/projects/galleria-minsk/screens-4-thumb.webp',
        bytes: 30830,
        sha256: 'f684038b6a29ce6d1ed63189ae823d7f2aba048ee5ac908e5c47527c4dbe4072',
    },
    {
        path: '/images/projects/galleria-minsk/screens-4.webp',
        bytes: 112246,
        sha256: 'c92c04c861fb52166184a6d408fddf9e4c3926cef5228d5aff7fa89fe04c8575',
    },
    {
        path: '/images/projects/galleria-minsk/screens-5-thumb.webp',
        bytes: 28588,
        sha256: '037e4d4424d124bcaacb45268b85176a52890f6766a814a569d6249346cf3da8',
    },
    {
        path: '/images/projects/galleria-minsk/screens-5.webp',
        bytes: 98566,
        sha256: '78f3c1ce337b68d6d644a0e9c45c3296969a4d3e05215bed177a930529dff709',
    },
    {
        path: '/images/projects/golden-plate/screens-2-thumb.webp',
        bytes: 47202,
        sha256: '718fd5e11beab11d8bb33ba35d56a1bd973e5fc37dce571391e1aad10eb0d0f1',
    },
    {
        path: '/images/projects/golden-plate/screens-2.webp',
        bytes: 212744,
        sha256: '1f462c9b2d96b1b68ed0a03fab1a86bcc73c094d20f95e4c3af7438d8cd330cc',
    },
    {
        path: '/images/projects/golden-plate/screens-3-thumb.webp',
        bytes: 42770,
        sha256: '4dc756ce07cba43b3d0021e357eb9a54dcd29974766351ba3d508d961566fab4',
    },
    {
        path: '/images/projects/golden-plate/screens-3.webp',
        bytes: 184848,
        sha256: '598311b433f9a26304aa1be8b0777de55ab48918eaf4197d5c9213a8a3d5d8b5',
    },
    {
        path: '/images/projects/golden-plate/screens-4-thumb.webp',
        bytes: 56284,
        sha256: '1785389c44a430ed3ff4624e33b04de9e28a80c1e44cb16168e799443c799d31',
    },
    {
        path: '/images/projects/golden-plate/screens-4.webp',
        bytes: 263706,
        sha256: '0e2294179b747b93264c0a9403f3742094bb08f0ef03a182cca5fe415dec699a',
    },
    {
        path: '/images/projects/golden-plate/screens-5-thumb.webp',
        bytes: 38720,
        sha256: '971446c2745a600e3a92f6a4534cefb174319ecef33753f398c15b53a7ed7113',
    },
    {
        path: '/images/projects/golden-plate/screens-5.webp',
        bytes: 160472,
        sha256: 'a9c925fde548133239e8af1c12d50354f66229816c3a31da07ef0d456587dd47',
    },
    {
        path: '/images/projects/immergas/screens-2-thumb.webp',
        bytes: 30090,
        sha256: '18d34594f62d59441f3754465db7891abf9a56e5589335f1df998c32ad1f95af',
    },
    {
        path: '/images/projects/immergas/screens-2.webp',
        bytes: 109294,
        sha256: 'c21454d56a030bd4f523edd047c2685527761f7365150ad154ab4ea5bf4a58b7',
    },
    {
        path: '/images/projects/immergas/screens-3-thumb.webp',
        bytes: 30376,
        sha256: '7a8522ccab5da32d99d9c919404883ff57a94f7406c066d3d9f9e2b2041b2d21',
    },
    {
        path: '/images/projects/immergas/screens-3.webp',
        bytes: 99070,
        sha256: 'c0e5ab422e3355e09be73fee9920c9beca5aba2ba3c30394aac98ffd5d1dff0e',
    },
    {
        path: '/images/projects/immergas/screens-4-thumb.webp',
        bytes: 22630,
        sha256: '32bdc2edc5407098eb6c364ac6e4f229cb6573a41ee78d438c67ad9f85a1d650',
    },
    {
        path: '/images/projects/immergas/screens-4.webp',
        bytes: 70018,
        sha256: '1fd8e89cc6cb8454ed5affe34bec86791bf2fc4ed3099df288c7b679adf19cea',
    },
    {
        path: '/images/projects/immergas/screens-5-thumb.webp',
        bytes: 53538,
        sha256: '895d45c2780badabcdcd594c2c5279fdafe997ae49d52b04164ad1f442b11e10',
    },
    {
        path: '/images/projects/immergas/screens-5.webp',
        bytes: 338628,
        sha256: '5eaab2b20513fdd0280f880df3a84e6fff6ae3e9912e05026e288cf5a473f964',
    },
    {
        path: '/images/projects/klimatprof/screens-2-thumb.webp',
        bytes: 26540,
        sha256: 'abbb0298e9850b9160a06105757f456b3529d42d03847c10a561350e11662400',
    },
    {
        path: '/images/projects/klimatprof/screens-2.webp',
        bytes: 86764,
        sha256: '13e38ae7ebf9348c1902ced7502fdd713897374e1b0352df26832352578dda15',
    },
    {
        path: '/images/projects/klimatprof/screens-3-thumb.webp',
        bytes: 23430,
        sha256: '603f186ed39943d9193955e1cc990a3448125effcb3d784724f84f193ac5c2a0',
    },
    {
        path: '/images/projects/klimatprof/screens-3.webp',
        bytes: 84552,
        sha256: '34342a69c000be949b2d9e2c3a4dcd93aa4a0793f522ef6109217dd1dc80ac14',
    },
    {
        path: '/images/projects/klimatprof/screens-4-thumb.webp',
        bytes: 18600,
        sha256: '0e1239d52ee2a7024ce5bc04ee46524ba18bf5110349720f6aecc337e9100abd',
    },
    {
        path: '/images/projects/klimatprof/screens-4.webp',
        bytes: 57758,
        sha256: 'a984300f46a7afa3982b8b5de69a7419e544e11f60f4c3e60957a59cc6fee8a8',
    },
    {
        path: '/images/projects/klimatprof/screens-5-thumb.webp',
        bytes: 19906,
        sha256: '61c95bfd1b0fcad1d55c085e4b3454d00ac5acc98a4c23afcde888b82c03eb90',
    },
    {
        path: '/images/projects/klimatprof/screens-5.webp',
        bytes: 65528,
        sha256: '76c7972b8086ad8c061aee53487d84a442f4f10be52f867be2822e732b8fea8f',
    },
    {
        path: '/images/projects/onetouch/go-1-thumb.webp',
        bytes: 29028,
        sha256: 'cfe264b3fe6d338557d2a11d86bbddc2ca2931741e1290c31d2dfee273c3ed97',
    },
    {
        path: '/images/projects/onetouch/go-1.webp',
        bytes: 94508,
        sha256: 'b045ee876053bac9bf5a4318ca313555c9947ea6caf27aff7a26202b87e1e0a1',
    },
    {
        path: '/images/projects/onetouch/go-2-thumb.webp',
        bytes: 24038,
        sha256: 'b900320b2ffdf821903c30e562c18c79084bfc75fd0f778d4af9eab47192bec4',
    },
    {
        path: '/images/projects/onetouch/go-2.webp',
        bytes: 80378,
        sha256: '19f2c274ecb09c750e6ed91444de46b2cf331811df9d5a3f9d2d4826a7d42f5c',
    },
    {
        path: '/images/projects/onetouch/go-3-thumb.webp',
        bytes: 19166,
        sha256: '757905c7e3b08d352103459670158a566fc165b62bce5ad53a9697cb342cbf6f',
    },
    {
        path: '/images/projects/onetouch/go-3.webp',
        bytes: 60332,
        sha256: '80d8bb4d682e90de2310ec1f7541946e4ea208fea51b70c6c23009d6a2c32882',
    },
    {
        path: '/images/projects/onetouch/go-4-thumb.webp',
        bytes: 24498,
        sha256: '004783abbb31fa24b432621ae4a705987c0ef5ee6e9443f10f08b64162296350',
    },
    {
        path: '/images/projects/onetouch/go-4.webp',
        bytes: 103902,
        sha256: 'f95972a42124afa572d34ac93e030daa0b4acbad5a0f405d77fc96fde0df529c',
    },
    {
        path: '/images/projects/onetouch/go-5-thumb.webp',
        bytes: 11764,
        sha256: '7b368dd7899c1572977ae45e784406ead14571d725a51aa7cf5ce693653154db',
    },
    {
        path: '/images/projects/onetouch/go-5.webp',
        bytes: 36314,
        sha256: 'f21d67b2812f9b4da5ba50b59afcc7e362ad4aba36321442b9117d7c51011026',
    },
    {
        path: '/images/projects/onetouch/pro-1-thumb.webp',
        bytes: 21506,
        sha256: '6bdd4a96870773cd7a6d1ce30324ff9d3e4af0d9a9644338c870c789fa758792',
    },
    {
        path: '/images/projects/onetouch/pro-1.webp',
        bytes: 68568,
        sha256: '0760b42c81383608680914e4a5505f1a040b625df8c54477b710c27c0b076d57',
    },
    {
        path: '/images/projects/onetouch/pro-2-thumb.webp',
        bytes: 26218,
        sha256: '8526a0b71d4904b1f7bff2b09f84443baec9e9c8fb54814bbe2a6156346f1281',
    },
    {
        path: '/images/projects/onetouch/pro-2.webp',
        bytes: 81300,
        sha256: 'ec6c5e5aa367848a384949bbc7062646b13dc57540308972a6664a91ba7feacc',
    },
    {
        path: '/images/projects/onetouch/pro-3-thumb.webp',
        bytes: 20784,
        sha256: '9f12c26e9c570bcf7eba01f37f997c240dd1bc1b7be1864db5c19fce6c9710c2',
    },
    {
        path: '/images/projects/onetouch/pro-3.webp',
        bytes: 67706,
        sha256: 'f84ffed6441266d56aae93ba968db336af5365f4ecb39cc21a97ed6850033f72',
    },
    {
        path: '/images/projects/onetouch/pro-4-thumb.webp',
        bytes: 14602,
        sha256: 'f0589ebd47e4d35f46915bc24ba5ef0f4ab4562064985cd0151f85df2d623497',
    },
    {
        path: '/images/projects/onetouch/pro-4.webp',
        bytes: 45924,
        sha256: 'd9f576af833ab86181763f0356a94228016b1bc9a43a5f54273f5ea2dcc954f9',
    },
    {
        path: '/images/projects/onetouch/pro-5-thumb.webp',
        bytes: 14104,
        sha256: 'c505a28c333d05d84d82e985ddb061703b9cc351ffb1408426144d7c40c8861e',
    },
    {
        path: '/images/projects/onetouch/pro-5.webp',
        bytes: 43496,
        sha256: '3bc75c5b9e57a5a97743d20f8fab06a7cc8d69a20ee06f9bffeae2b12191e48b',
    },
    {
        path: '/images/projects/potlucky/oomi-1-thumb.webp',
        bytes: 42646,
        sha256: 'bd0495ef657257192334e7b9b6a2db4aa268f7b818b5b5a250733dcd454203e8',
    },
    {
        path: '/images/projects/potlucky/oomi-1.webp',
        bytes: 164244,
        sha256: '0ba70c2b53030c157f196d3e507caec0829bd2ac0f82e3c3b277ac8b4797ebc7',
    },
    {
        path: '/images/projects/potlucky/oomi-2-thumb.webp',
        bytes: 27298,
        sha256: 'd30458bb90deab1934e414c0b1b88f8a370683c93c5bed705b7b982dd9c3836d',
    },
    {
        path: '/images/projects/potlucky/oomi-2.webp',
        bytes: 91680,
        sha256: '6c2e82f6e7b40f2461d6579d21b8d4ff07f131fb75f15eb91d7aeb855e4c0c68',
    },
    {
        path: '/images/projects/potlucky/oomi-3-thumb.webp',
        bytes: 26178,
        sha256: '54c375c77ef2056b66449df20cc1c48d44fb851a3e90d611b4ddf3cbb7428ef7',
    },
    {
        path: '/images/projects/potlucky/oomi-3.webp',
        bytes: 86292,
        sha256: '91d43a3284f6767eed238f8d3b88eb43719e73e51c2590ff1c5596fe84e89c6b',
    },
    {
        path: '/images/projects/potlucky/oomi-4-thumb.webp',
        bytes: 35902,
        sha256: 'ba50a576cf7e455396c01650b356d2cffababadad9d6ecc522bdea1f544668f2',
    },
    {
        path: '/images/projects/potlucky/oomi-4.webp',
        bytes: 141468,
        sha256: '07a58deab5791ac2cd7afbd324d5e1906e61b263851e42f5068ecff975068cca',
    },
    {
        path: '/images/projects/potlucky/oomi-5-thumb.webp',
        bytes: 26858,
        sha256: '3f9af672c13436c75f1698933fead48cae856d69d06cba5d9374afaeceda921f',
    },
    {
        path: '/images/projects/potlucky/oomi-5.webp',
        bytes: 99482,
        sha256: '8a9716ccca885dba2309e72d756564d1551d6e1dad3736433f6696598f457043',
    },
    {
        path: '/monogram.svg',
        bytes: 256,
        sha256: 'ef6546d4ccb15e872e2e80bd71bc4af158fcab15ac43f02a201fb455380400d1',
    },
];
