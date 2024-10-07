import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Diary/Home";
import Diary from "../../pages/Diary/Diary";
import New from "../../pages/Diary/New";
import Edit from "../../pages/Diary/Edit";
import Notfound from "../../pages/Diary/Notfound";
import { DiaryProvider } from "./DiaryProvider";

function DiaryRoutes() {
  return (
    <DiaryProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </DiaryProvider>
  );
}

export default DiaryRoutes;
