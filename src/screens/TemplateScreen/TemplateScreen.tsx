import { ApiProvider } from '~/screens/TemplateScreen/Api/ApiProvider';
import { Posts } from '~/screens/TemplateScreen/Components/Posts';

const TemplateScreen = () => {
  return (
    <ApiProvider>
      <Posts />
    </ApiProvider>
  );
};

export default TemplateScreen;
