export interface Subtasks {
  [x: string]: any;
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Tasks {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtasks[];
}

export interface Columns {
  id: string;
  name: string;
  tasks: Tasks[];
}

export interface Boards {
  id: string;
  name: string;
  columns: Columns[];
}

export interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
}

export interface Errors {
  name?: string;
  nameError?: boolean;
  [key: string]: string | boolean | undefined;
  title?: string;
  titleError?: boolean;
}
