import {MatDialogConfig} from "@angular/material/dialog";
declare var $: any;
export enum ModalEnum {
  // First enum doesn't work in switch case for same reason, hence the Dummenum  (it appears like a typescript bug)
  Dummyenum, SidebarDefault, SidebarLarge, ModalDefault, ModalSmall, ModalLarge, ModalFullscreen,SidebarLargeResponsive,SidebarSmallResponsive,SidebarChatSmallResponsive,SidebarDocumentSmallResponsive
};
export function modalConfig(config: MatDialogConfig, modalType?: ModalEnum): MatDialogConfig {
  if (modalType) {
    switch (modalType) { // Added + black magic fix so that the enum switch works
      case ModalEnum.ModalDefault:
        config.maxWidth = '100vw';
        config.width = '60vw';
        config.maxHeight = '90vh';
        break;
      case ModalEnum.ModalSmall:
        config.maxWidth = '100vw';
        config.width = '30vw';
        config.maxHeight = '90vh';
        break;
      case ModalEnum.ModalLarge:
        config.maxWidth = '100vw';
        config.width = '80vw';
        config.maxHeight = '90vh';
        break;
      case ModalEnum.ModalFullscreen:
        config.maxWidth = '100vw';
        config.maxHeight = '100vh';
        config.height = '100%';
        config.width = '100%';
        break;
      case ModalEnum.SidebarDefault:
        config.width = '303px';
        config.height = '100vh';
        config.maxHeight = '100vh';
        config.position = {
          right: '0px'
        };
        break;
      case ModalEnum.SidebarLarge:
        config.width = '80vw';
        config.height = '100vh';
        config.maxHeight = '100vh';
        config.position = {
          right: '0px'
        };
        break;
      case ModalEnum.SidebarLargeResponsive:
        config.width = '80vw';
        config.height = '100vh';
        config.maxHeight = '100vh';
        config.position = {
          right: '0px'
        };
        if (window.innerWidth < 768) {
          config.width = '100vw';
          config.maxWidth = '100vw';
        }
        break;
      case ModalEnum.SidebarSmallResponsive:
        config.width = '50vw';
        config.height = '100vh';
        config.maxHeight = '100vh';
        config.position = {
          right: '0px'
        };
        if (window.innerWidth < 768) {
          config.width = '100vw';
          config.maxWidth = '100vw';
        }
        break;
        case ModalEnum.SidebarChatSmallResponsive:
          config.width = '450px';
          config.height = '590px';
          config.maxHeight = '650px';
          config.position = {
            right: '20px',
            bottom:'10px'
          };
          if (window.innerWidth < 768) {
            config.width = '100vw';
            config.maxWidth = '100vw';
            config.height = '590px';
            config.maxHeight = '650px';
            config.position = {
              right: '0px',
              bottom:'0px'
            };
          }
          break;
          case ModalEnum.SidebarDocumentSmallResponsive:
            config.width = '300px';
            config.height = '100vh';
            config.maxHeight = '100vh';
            config.position = {
              right: '0px'
            };
            if (window.innerWidth < 768) {
              config.width = '100vw';
              config.maxWidth = '100vw';
            }
            break;
    }
  }

  return config;
}
