export const Videos = [
  {
    id: 1,
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut accusamus aliquid autem sint reprehenderit aut dolor. Facilis veritatis, maxime libero illum non atque dolores iure quasi quod voluptates placeat fugiat.',
    user: {
      uid: 1,
      avatar: '',
      name: 'Nguyen Van A',
      isOfficial: true,
    },
    video: require('../assets/videos/video999.mp4'),
    isLiked: false,
    likeQty: 150,
    isFavorite: false,
    favoriteQty: 10,
    shareQty: 5,
    isOfficial: false,
    tags: [
      {id: 1, name: '#BongDa'},
      {id: 2, name: '#Messi'},
    ],
    comments: [
      {
        id: 1,
        videoId: 2,
        comments:
          'Great video Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque architecto rem, sunt in reiciendis minus maxime impedit, necessitatibus fuga magni magnam, est dolore voluptatem tempora dolorem voluptates aliquam dicta unde?',
        user: {
          uid: 1,
          name: 'Chu Dinh Hanh',
          avatar: '',
        },
        children: [],
        parentId: null,
      },
      {
        id: 2,
        uid: 2,
        videoId: 2,
        comments: 'This video is so good',
        user: {
          uid: 2,
          name: 'Chu Dinh Hao',
          avatar: '',
        },
        children: [
          {
            id: 3,
            uid: 3,
            videoId: 2,
            comments: 'Me too!',
            user: {
              uid: 2,
              name: 'Chu Dinh Bao',
              avatar: '',
            },
            children: [],
            parentId: 2,
          },
          {
            id: 4,
            uid: 2,
            videoId: 2,
            comments: 'Thk u :)',
            user: {
              uid: 2,
              name: 'Chu Dinh Hoa',
              avatar: '',
            },
            children: [
              {
                id: 5,
                uid: 2,
                videoId: 2,
                comments: 'Thk u :)',
                user: {
                  uid: 2,
                  name: 'Chu Dinh Hoa',
                  avatar: '',
                },
                children: [
                  {
                    id: 9,
                    uid: 2,
                    videoId: 2,
                    comments: 'Thk u :)',
                    user: {
                      uid: 2,
                      name: 'Chu Dinh Hoa',
                      avatar: '',
                    },
                    children: [
                      {
                        id: 10,
                        uid: 2,
                        videoId: 2,
                        comments: 'Thk u :)',
                        user: {
                          uid: 2,
                          name: 'Chu Dinh Hoa',
                          avatar: '',
                        },
                        children: [
                          {
                            id: 11,
                            uid: 2,
                            videoId: 2,
                            comments: 'Thk u :)',
                            user: {
                              uid: 2,
                              name: 'Chu Dinh Hoa',
                              avatar: '',
                            },
                            children: [
                              {
                                id: 12,
                                uid: 2,
                                videoId: 2,
                                comments: 'Thk u :)',
                                user: {
                                  uid: 2,
                                  name: 'Chu Dinh Hoa',
                                  avatar: '',
                                },
                                children: [],
                                parentId: 2,
                              },
                            ],
                            parentId: 2,
                          },
                        ],
                        parentId: 2,
                      },
                    ],
                    parentId: 2,
                  },
                ],
                parentId: 2,
              },
            ],
            parentId: 2,
          },
        ],
        parentId: null,
      },
      {
        id: 6,
        uid: 4,
        videoId: 2,
        comments: 'Not good',
        user: {
          uid: 4,
          name: 'Chu Dinh B',
          avatar: '',
        },
        children: [
          {
            id: 1,
            videoId: 2,
            comments:
              'Great video Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque architecto rem, sunt in reiciendis minus maxime impedit, necessitatibus fuga magni magnam, est dolore voluptatem tempora dolorem voluptates aliquam dicta unde?',
            user: {
              uid: 1,
              name: 'Chu Dinh Hanh',
              avatar: '',
            },
            children: [],
            parentId: null,
          },
        ],
        parentId: null,
      },
    ],
    totalView: 10000000,
  },
  {
    id: 2,
    title: 'My first video2',
    user: {
      uid: 2,
      avatar:
        'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg',
      name: 'Nguyen Van A',
      isOfficial: false,
    },
    video: require('../assets/videos/v5.mp4'),
    isLiked: true,
    likeQty: 150,
    isFavorite: false,
    favoriteQty: 10,
    shareQty: 5,
    isOfficial: false,
    tags: [
      {id: 1, name: '#BongDa'},
      {id: 2, name: '#Messi'},
    ],
    comments: [
      {
        id: 1,
        videoId: 2,
        comments:
          'Great video Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque architecto rem, sunt in reiciendis minus maxime impedit, necessitatibus fuga magni magnam, est dolore voluptatem tempora dolorem voluptates aliquam dicta unde?',
        user: {
          uid: 1,
          name: 'Chu Dinh Hanh',
          avatar: '',
        },
        children: [],
        parentId: null,
      },
    ],
    totalView: 506000,
  },
  {
    id: 3,
    title: 'My first video2',
    user: {
      uid: 1,
      avatar:
        'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg',
      name: 'Nguyen Van A',
      isOfficial: false,
    },
    video: require('../assets/videos/v9.mp4'),
    isLiked: true,
    likeQty: 150,
    isFavorite: false,
    favoriteQty: 10,
    shareQty: 5,
    isOfficial: false,
    tags: [
      {id: 1, name: '#BongDa'},
      {id: 2, name: '#Messi'},
    ],
    comments: [],
    totalView: 500,
  },
  {
    id: 4,
    title: 'My first video2',
    user: {
      uid: 1,
      avatar:
        'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg',
      name: 'Nguyen Van A',
      isOfficial: true,
    },
    video: require('../assets/videos/v8.mp4'),
    isLiked: true,
    likeQty: 150,
    isFavorite: false,
    favoriteQty: 10,
    shareQty: 5,
    isOfficial: false,
    tags: [
      {id: 1, name: '#BongDa'},
      {id: 2, name: '#Messi'},
    ],
    comments: [],
    totalView: 99999,
  },
];
