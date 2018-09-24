/**
 * 模态框--model类
 */
export interface ModalContentModel {
  /**
   * 唯一ID
   */
  id: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 内容
   */
  content: string;
  /**
   * 选择结果
   */
  result?: boolean;

}
