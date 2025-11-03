import type { PropertyListing } from '@/lib/types';

export const mockListings: PropertyListing[] = [
  {
    id: '1',
    title: 'Denize Sıfır Lüks Villa',
    description: 'Alanya\'nın en prestijli bölgelerinden Kestel\'de, denize sıfır konumda yer alan bu özel mülk, lüks ve konforu bir arada sunuyor.',
    price: 25000000,
    location: {
      city: 'Antalya',
      district: 'Alanya',
      neighborhood: 'Kestel',
    },
    type: 'sale',
    propertyType: 'villa',
    roomCount: '5+1',
    size: 450,
    features: ['Yüzme Havuzu', 'Özel Plaj', 'Akıllı Ev Sistemi', 'Sauna', 'Deniz Manzarası'],
    imageUrls: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCKH2uHG9jpuBT1Rodnvl9tl3IX9iUsPma18RM7u01Fk4X1I2qilU3vrq1aHky-49ImX5jOzsfGxQDtYfCo7OZv7s4Z10gpeyv-hHHV5iX7rFW7LRfG9fdnmBmE2kKb7iyRuoaUB3tcUDestg012DVDtXRQQEifX1jcBM7qIhmLxUJIpDc_jGm8nZKQ8AgwzK9Cr0nDKwLzJcHmX4wCSlUM49NL_jumHn_3o8IPxEHdhxs55u-rmQ6xjowRXMswWHIuc9wMkiPiGik',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAczeWq2RG98F_0IdxEmy_YbvBV5slz1T260CfBJHPHKel03zOzoVbsxnbf7g_IxunlamH548J9VX4eD8pEgLiHt8w1nNGKoSDdO5O42ZwMOBrg8zItI0ITFmGJiKCkl4z6c1ksP0c3FjhGWbuObb6SiwEfRvljA7A7pPxTCmRtkMFW02I0ZPyJjNur0EcTQwSiynq9TWvO0yC_erYksT56U5afY5Nm7e54wVFgBuxH2tjZk0TNvizEloL8C9bE77nvSsYv0GduMIc',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBcsqwCPpavMEuiwRyTbEEAhRKawuUDdwT2TGRqhvJHyhQ_nUU8Mn4iWQUfLZKv0JIpxFNceCaHHNSUVeEH4My_sPjHHWla0EWEY58uHpEGTk2ujXSid8k5VLOE6OIFSjjmN4Ak6DDjvSydh4GXuHnNGCZoXPBMVaTG7bOPf3Al6QjSYNdpEWJzeH-nIavGpTfEiC1nu-gTaOwZ6wQmcNAIvCI58VcibDcKvkyZ7U89aRu_3Gc3vcr3cg_nocCjPURaUwCf0stZ8PM',
    ],
    isFeatured: true,
    agent: {
      name: 'Ayşe Yılmaz',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3STxku2z1o15l61UpcSPfbptolIgSrdoF2GnQKW7DhnU-09u4dADQ0va1xFq6zwuHu6q2p5qB3EMyj7Br2bDiLhde8H2mB_cmJmFyaQkrG58gip-kNg-TUyTDok1x3mauiA7e4zQhox2KYOzNTdgZbNfX_PjVgXmBmJQJln3N07FKtvL2tlOHyJNI4VBPCqPveB3ZHlsERlb2JRohy6IGu2Taaf2IzA-2rmbbmqSdkCinJfpVNCoQ01P73Unpz4OCzzxyJfCHLzw',
    },
    postedDate: '2024-07-15',
  },
  {
    id: '2',
    title: 'Şehir Merkezinde Modern Daire',
    description: 'Antalya\'nın kalbinde, tüm olanaklara yürüme mesafesinde modern ve şık bir daire.',
    price: 8500000,
    location: {
      city: 'Antalya',
      district: 'Muratpaşa',
      neighborhood: 'Merkez',
    },
    type: 'sale',
    propertyType: 'apartment',
    roomCount: '2+1',
    size: 110,
    features: ['Merkezi Konum', 'Güvenlik', 'Otopark'],
    imageUrls: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7qKfznrDpWxpU7FkV8D-iG7UCcWxKSiAQew5yNj2akmSa_KA1BQ4q0J23W5-DCcpAey_zHmhFjm9zr2LtEMCgIKDFxkkvzlbXC00sYi-GYuSZV464xvaUcHb93ULcerwD2vJu0OGBLQa7ehDv3w-41JBSWl26cu_aK9P8jHOoozArm-Al1L5ieeY3A-xFLgGUn5pJLfJJMIp9M7FXqcqfbQDW1AeR2JBC8AILaTG_PJpulq7qoJc5IAKMj5OtxxfDIbETOlEq0Ow',
    ],
    isFeatured: true,
    agent: {
      name: 'Mehmet Kaya',
      avatarUrl: 'https://example.com/agent2.jpg',
    },
    postedDate: '2024-07-12',
  },
  {
    id: '3',
    title: 'Geniş Bahçeli Müstakil Ev',
    description: 'Sakin ve huzurlu bir bölgede, geniş bir bahçeye sahip müstakil ev.',
    price: 15750000,
    location: {
      city: 'Antalya',
      district: 'Alanya',
      neighborhood: 'Oba',
    },
    type: 'sale',
    propertyType: 'house',
    roomCount: '4+1',
    size: 300,
    features: ['Geniş Bahçe', 'Özel Otopark', 'Şömine'],
    imageUrls: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCw5K9wux5--cQZA2sYgm-0YaQ0UdlOlfWBLj-RjwlXcaBHvVE0LmJbs0gWPT-3ki-FtYx4v7WKiQG1QkG__glNN87zZDrDURSvzNvmDVxRcsBKbiEgebLf6krXYuPygqiuPoXea0I4GlTYMKclTUitxWuteetXoOasI5-YTMN3bWU5ljQJ_bKh1LP2alHKr6z19oO1EBcmF9Fg_FVwwp_nRmy5zCLPCTQlGnjg2OFBRPI69FBG0SNK2b9ibR0z7tNVuFBgtDuGWZY',
    ],
    isFeatured: true,
    agent: {
      name: 'Ayşe Yılmaz',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3STxku2z1o15l61UpcSPfbptolIgSrdoF2GnQKW7DhnU-09u4dADQ0va1xFq6zwuHu6q2p5qB3EMyj7Br2bDiLhde8H2mB_cmJmFyaQkrG58gip-kNg-TUyTDok1x3mauiA7e4zQhox2KYOzNTdgZbNfX_PjVgXmBmJQJln3N07FKtvL2tlOHyJNI4VBPCqPveB3ZHlsERlb2JRohy6IGu2Taaf2IzA-2rmbbmqSdkCinJfpVNCoQ01P73Unpz4OCzzxyJfCHLzw',
    },
    postedDate: '2024-07-10',
  }
];
