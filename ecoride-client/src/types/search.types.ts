export interface SearchParams {
    departure: string;
    destination: string;
    date: string;
  }
  
  export interface SearchFormProps {
    initialValues?: SearchParams;
  }