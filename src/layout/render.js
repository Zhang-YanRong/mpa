import header from './header.ejs';
import footer from './footer.ejs';
import layout from './layout.ejs';

export default {
    render: ({title, keyword, description, content}) => {
        const renderData = {
            title,
            keyword,
            description,
            header: header(),
            footer: footer(),
            content: content(),
        };
        return layout(renderData);
    }
};