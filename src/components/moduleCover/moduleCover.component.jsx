import './moduleCover.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faIdBadge, faWarehouse, faCircleQuestion, faCar, faPeopleGroup, faSearch, faToolbox} from '@fortawesome/free-solid-svg-icons';

const moduleNameToIcon = (moduleName) => {
    let iconName;
    switch(moduleName) {
        case '主页':
            iconName = faHouse;
            break
        case '个人信息':
            iconName = faIdBadge;
            break
        // case '待办事项':
        //     iconName = faCalendarCheck;
        //     break
        // case '采购请求':
        //     iconName = faClipboardQuestion;
        //     break
        // case '报销请求':
        //     iconName = faMoneyBillTransfer;
        //     break
        // case '进度管理':
        //     iconName = faBarsProgress;
        //     break
        case '仓库搜索':
            iconName = faSearch;
            break
        case '仓库管理':
            iconName = faToolbox;
            break
        case '车辆管理':
            iconName = faCar;
            break
        case '人事管理':
            iconName = faPeopleGroup;
            break
        default: 
            iconName = faCircleQuestion;
            break
    };
    return iconName

}

const ModuleCover = (props) => {
    const { moduleName } = props;

    const icon = moduleNameToIcon(moduleName);

    return (
        <div className='module-cover'>
            <FontAwesomeIcon icon={icon} className='module-icon'/>
            <h2>{moduleName}</h2>
        </div>
    )

}



export default ModuleCover;