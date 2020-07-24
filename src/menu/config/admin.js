const baseKey = '/admin';
const menuList = [
    {
        title: 'Navigation One',
        key: `${baseKey}/navigation1`,
        children: [
            {
                title: 'Option 1',
                key: `${baseKey}/option1`
            },
            {
                title: 'Option 2',
                key: `${baseKey}/option2`
            },
            {
                title: 'Option 3',
                key: `${baseKey}/option3`
            },
            {
                title: 'Option 4',
                key: `${baseKey}/option4`
            }
        ]
    },
    {
        title: 'Navigation Two',
        key: `${baseKey}/navigation2`,
        children: [
            {
                title: 'Option 5',
                key: `${baseKey}/option5`
            },
            {
                title: 'Option 6',
                key: `${baseKey}/option6`
            },
            {
                title: 'Submenu',
                key: `${baseKey}/n2_sub`,
                children: [
                    {
                        title: 'Option 7',
                        key: `${baseKey}/option7`
                    },
                    {
                        title: 'Option 8',
                        key: `${baseKey}/option8`
                    },
                ]
            }
        ]
    },
    {
        title: 'Navigation Three',
        key: `${baseKey}/navigation3`,
        children: [
            {
                title: 'Option 9',
                key: `${baseKey}/option9`
            },
            {
                title: 'Option 10',
                key: `${baseKey}/option10`
            },
            {
                title: 'Option 11',
                key: `${baseKey}/option11`
            },
            {
                title: 'Option 12',
                key: `${baseKey}/option12`
            }
        ]
    },
    {
        title: '化学品数据管理',
        key: `${baseKey}/chemical_manage`
    }
];

export default menuList;
