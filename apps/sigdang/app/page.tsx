import Menu from './components/Menu';
import Slider from './components/Slider';
import styles from './page.module.css';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="h-[60vh]">
      <Slider />
      <Menu />
    </div>
  );
}
