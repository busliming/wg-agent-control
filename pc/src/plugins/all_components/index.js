import Vue from 'vue'

// Vue.use(ElementUI);

// 自定义组件
// import page from './page'
// Vue.component('page', page);

// element UI
import { 
    Button, 
    ButtonGroup,
    Select,
    Option,
    Tabs,
    TabPane,
    Carousel, CarouselItem,
    Menu,
    Submenu,
    MenuItem, MenuItemGroup,
    Container,
    Main,
    Header,
    Footer,
    Row, Col,
    Card,    
    Badge,
    Table, TableColumn,
    Aside,
    Input,
    Tooltip,
    Message,
    MessageBox,
    Form, FormItem,
    Step, Steps,
    DatePicker, TimePicker, TimeSelect, 
    Tag, Popover,    
    Checkbox, CheckboxButton, CheckboxGroup,
    Radio, RadioGroup, RadioButton, 
    Pagination,
    Dropdown, DropdownItem, DropdownMenu,
    Loading, Dialog,
    Collapse,
    CollapseItem,
    Slider,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$Message = Message;
Vue.prototype.$MessageBox = MessageBox;
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Carousel);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(CarouselItem);
Vue.use(MenuItemGroup);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Badge);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Aside);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Step);
Vue.use(Steps);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(TimeSelect);
Vue.use(Tag);
Vue.use(Popover);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Slider);
Vue.use(Tooltip);