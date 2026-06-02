#if UNITY_EDITOR
using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

#if VRC_SDK_VRCSDK3
using VRC.SDK3.Dynamics.PhysBone.Components;
#endif

namespace VRCBodyCollider
{
    public class VRCBodyColliderSetup : EditorWindow
    {
        private GameObject avatarRoot;
        private bool showAdvanced = false;
        private float colliderScale = 1.0f;
        private bool setupHead    = true;
        private bool setupChest   = true;
        private bool setupHips    = true;
        private bool setupHands   = true;
        private bool setupArms    = true;
        private bool setupLegs    = true;

        private Vector2 scrollPos;

        [MenuItem("VRC Tools/Body Collider Setup")]
        public static void ShowWindow()
        {
            var window = GetWindow<VRCBodyColliderSetup>("VRC Body Collider");
            window.minSize = new Vector2(360, 520);
            window.Show();
        }

        private void OnGUI()
        {
            scrollPos = EditorGUILayout.BeginScrollView(scrollPos);

            // ヘッダー
            GUIStyle titleStyle = new GUIStyle(EditorStyles.boldLabel)
            {
                fontSize = 16,
                alignment = TextAnchor.MiddleCenter
            };
            EditorGUILayout.Space(10);
            EditorGUILayout.LabelField("VRC Body Collider Setup", titleStyle);
            EditorGUILayout.Space(4);

            GUIStyle subStyle = new GUIStyle(EditorStyles.miniLabel)
            {
                alignment = TextAnchor.MiddleCenter,
                wordWrap = true
            };
            EditorGUILayout.LabelField("アバターにPhysBone Colliderを自動で設定します。\n他アバターとの体貫通を軽減できます。", subStyle);
            EditorGUILayout.Space(12);

            // アバター選択
            EditorGUILayout.LabelField("▼ アバター設定", EditorStyles.boldLabel);
            avatarRoot = (GameObject)EditorGUILayout.ObjectField(
                "アバターのルート",
                avatarRoot,
                typeof(GameObject),
                true
            );

            // Hierarchyで選択中のオブジェクトを自動セット
            if (avatarRoot == null && Selection.activeGameObject != null)
            {
                avatarRoot = Selection.activeGameObject;
            }

            EditorGUILayout.Space(8);

            // 部位の選択
            EditorGUILayout.LabelField("▼ 設定する部位", EditorStyles.boldLabel);
            EditorGUILayout.BeginVertical(EditorStyles.helpBox);
            setupHead  = EditorGUILayout.ToggleLeft("頭 / 首",     setupHead);
            setupChest = EditorGUILayout.ToggleLeft("胸 / 上半身", setupChest);
            setupHips  = EditorGUILayout.ToggleLeft("腰 / 下半身", setupHips);
            setupHands = EditorGUILayout.ToggleLeft("手 / 指",     setupHands);
            setupArms  = EditorGUILayout.ToggleLeft("腕",          setupArms);
            setupLegs  = EditorGUILayout.ToggleLeft("脚",          setupLegs);
            EditorGUILayout.EndVertical();
            EditorGUILayout.Space(8);

            // 詳細設定
            showAdvanced = EditorGUILayout.Foldout(showAdvanced, "▼ 詳細設定（任意）");
            if (showAdvanced)
            {
                EditorGUILayout.BeginVertical(EditorStyles.helpBox);
                colliderScale = EditorGUILayout.Slider("コライダーサイズ倍率", colliderScale, 0.5f, 2.0f);
                EditorGUILayout.HelpBox("体型が大きい/小さいアバターはここで調整してください。", MessageType.Info);
                EditorGUILayout.EndVertical();
            }

            EditorGUILayout.Space(12);

            // セットアップボタン
            GUI.backgroundColor = new Color(0.4f, 0.8f, 0.4f);
            if (GUILayout.Button("コライダーを自動セットアップ", GUILayout.Height(44)))
            {
                if (avatarRoot == null)
                    EditorUtility.DisplayDialog("エラー", "アバターのルートオブジェクトを設定してください。", "OK");
                else
                    RunSetup();
            }
            GUI.backgroundColor = Color.white;

            EditorGUILayout.Space(6);

            // 削除ボタン
            GUI.backgroundColor = new Color(1.0f, 0.6f, 0.4f);
            if (GUILayout.Button("セットアップしたコライダーを削除", GUILayout.Height(30)))
            {
                if (avatarRoot == null)
                    EditorUtility.DisplayDialog("エラー", "アバターのルートオブジェクトを設定してください。", "OK");
                else if (EditorUtility.DisplayDialog("確認", "このツールで追加したコライダーをすべて削除しますか？", "削除", "キャンセル"))
                    RemoveSetup();
            }
            GUI.backgroundColor = Color.white;

            EditorGUILayout.Space(10);
            EditorGUILayout.HelpBox(
                "【使い方】\n" +
                "1. アバターのルートオブジェクトをセット\n" +
                "2. 設定する部位にチェック\n" +
                "3. 「コライダーを自動セットアップ」を押す\n" +
                "4. そのままアバターをアップロードするだけ！\n\n" +
                "【注意】\n" +
                "相手のアバターも同様の設定をしていると\nより自然な貫通防止になります。",
                MessageType.None
            );

            EditorGUILayout.EndScrollView();
        }

        // ─────────────────────────────────────────
        // メインセットアップ処理
        // ─────────────────────────────────────────
        private void RunSetup()
        {
            Undo.RegisterFullObjectHierarchyUndo(avatarRoot, "VRC Body Collider Setup");

            var animator = avatarRoot.GetComponent<Animator>();
            if (animator == null || !animator.isHuman)
            {
                EditorUtility.DisplayDialog(
                    "エラー",
                    "Humanoidアバターが見つかりません。\nAnimatorコンポーネントとHumanoidリグが必要です。",
                    "OK"
                );
                return;
            }

            int count = 0;

            if (setupHead)
            {
                count += AddCollider(animator, HumanBodyBones.Head,
                    VRCPhysBoneColliderShape.Sphere,  0.10f * colliderScale, Vector3.zero, "Head");
                count += AddCollider(animator, HumanBodyBones.Neck,
                    VRCPhysBoneColliderShape.Capsule, 0.07f * colliderScale, Vector3.zero, "Neck");
            }

            if (setupChest)
            {
                count += AddCollider(animator, HumanBodyBones.Chest,
                    VRCPhysBoneColliderShape.Capsule, 0.14f * colliderScale, Vector3.zero, "Chest");
                count += AddCollider(animator, HumanBodyBones.UpperChest,
                    VRCPhysBoneColliderShape.Capsule, 0.13f * colliderScale, Vector3.zero, "UpperChest");
                count += AddCollider(animator, HumanBodyBones.Spine,
                    VRCPhysBoneColliderShape.Capsule, 0.12f * colliderScale, Vector3.zero, "Spine");
            }

            if (setupHips)
            {
                count += AddCollider(animator, HumanBodyBones.Hips,
                    VRCPhysBoneColliderShape.Sphere,  0.15f * colliderScale, Vector3.zero, "Hips");
            }

            if (setupArms)
            {
                count += AddCollider(animator, HumanBodyBones.LeftUpperArm,
                    VRCPhysBoneColliderShape.Capsule, 0.06f * colliderScale, Vector3.zero, "LeftUpperArm");
                count += AddCollider(animator, HumanBodyBones.RightUpperArm,
                    VRCPhysBoneColliderShape.Capsule, 0.06f * colliderScale, Vector3.zero, "RightUpperArm");
                count += AddCollider(animator, HumanBodyBones.LeftLowerArm,
                    VRCPhysBoneColliderShape.Capsule, 0.05f * colliderScale, Vector3.zero, "LeftLowerArm");
                count += AddCollider(animator, HumanBodyBones.RightLowerArm,
                    VRCPhysBoneColliderShape.Capsule, 0.05f * colliderScale, Vector3.zero, "RightLowerArm");
            }

            if (setupHands)
            {
                count += AddCollider(animator, HumanBodyBones.LeftHand,
                    VRCPhysBoneColliderShape.Sphere,  0.05f * colliderScale, Vector3.zero, "LeftHand");
                count += AddCollider(animator, HumanBodyBones.RightHand,
                    VRCPhysBoneColliderShape.Sphere,  0.05f * colliderScale, Vector3.zero, "RightHand");
            }

            if (setupLegs)
            {
                count += AddCollider(animator, HumanBodyBones.LeftUpperLeg,
                    VRCPhysBoneColliderShape.Capsule, 0.09f * colliderScale, Vector3.zero, "LeftUpperLeg");
                count += AddCollider(animator, HumanBodyBones.RightUpperLeg,
                    VRCPhysBoneColliderShape.Capsule, 0.09f * colliderScale, Vector3.zero, "RightUpperLeg");
                count += AddCollider(animator, HumanBodyBones.LeftLowerLeg,
                    VRCPhysBoneColliderShape.Capsule, 0.07f * colliderScale, Vector3.zero, "LeftLowerLeg");
                count += AddCollider(animator, HumanBodyBones.RightLowerLeg,
                    VRCPhysBoneColliderShape.Capsule, 0.07f * colliderScale, Vector3.zero, "RightLowerLeg");
            }

            EditorUtility.DisplayDialog(
                "完了",
                $"{count} 個のコライダーを設定しました！\nアバターをアップロードすれば完成です。",
                "OK"
            );
        }

        // ─────────────────────────────────────────
        // コライダーを1つ追加するヘルパー
        // ─────────────────────────────────────────
        private int AddCollider(
            Animator animator,
            HumanBodyBones bone,
            VRCPhysBoneColliderShape shape,
            float radius,
            Vector3 offset,
            string tag)
        {
            Transform boneTransform = animator.GetBoneTransform(bone);
            if (boneTransform == null) return 0;

            string objName = $"[BodyCollider] {tag}";

            // 既に同名のコライダーがあればスキップ
            if (boneTransform.Find(objName) != null) return 0;

            var colliderObj = new GameObject(objName);
            colliderObj.transform.SetParent(boneTransform, false);
            colliderObj.transform.localPosition = offset;
            colliderObj.transform.localRotation = Quaternion.identity;

#if VRC_SDK_VRCSDK3
            var col        = colliderObj.AddComponent<VRCPhysBoneCollider>();
            col.shapeType  = shape;
            col.radius     = radius;
            col.height     = (shape == VRCPhysBoneColliderShape.Capsule) ? radius * 3.0f : 0f;
            col.insideBounds = false;
#else
            // VRChat SDK未導入時はUnity標準コライダーで仮配置
            colliderObj.AddComponent<SphereCollider>().radius = radius;
            Debug.LogWarning($"[VRC Body Collider] VRChat SDK3 が見つかりません。{objName} にUnity標準コライダーを仮配置しました。SDKをインポートすれば自動的に置き換わります。");
#endif

            Undo.RegisterCreatedObjectUndo(colliderObj, "Add Body Collider");
            return 1;
        }

        // ─────────────────────────────────────────
        // 追加したコライダーをすべて削除
        // ─────────────────────────────────────────
        private void RemoveSetup()
        {
            var allTransforms = avatarRoot.GetComponentsInChildren<Transform>(true);
            var toDelete = new List<GameObject>();

            foreach (var t in allTransforms)
            {
                if (t != null && t.name.StartsWith("[BodyCollider]"))
                    toDelete.Add(t.gameObject);
            }

            foreach (var obj in toDelete)
                Undo.DestroyObjectImmediate(obj);

            EditorUtility.DisplayDialog("削除完了", $"{toDelete.Count} 個のコライダーを削除しました。", "OK");
        }
    }

    // SDK未導入時のコンパイルエラー防止用ダミー型
#if !VRC_SDK_VRCSDK3
    public enum VRCPhysBoneColliderShape { Sphere, Capsule, Plane }
#endif
}
#endif
